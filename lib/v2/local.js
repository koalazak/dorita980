'use strict';

const mqtt = require('mqtt');

var dorita980 = function localV2 (user, password, host, emitIntervalTime, version) {
  if (!user) throw new Error('robotID is required.');
  if (!password) throw new Error('password is required.');
  if (!host) throw new Error('host is required.');

  const posibleCap = ['pose', 'ota', 'multiPass', 'carpetBoost', 'pp', 'binFullDetect', 'langOta', 'maps', 'edge', 'eco', 'svcConf'];
  const versionProps = {
    2: ['audio', 'soundVer', 'cleanSchedule', 'uiSwVer', 'navSwVer', 'wifiSwVer', 'mobilityVer', 'bootloaderVer', 'umiVer'],
    3: ['subModSwVer', 'cleanSchedule2']
  };
  const modelProps = {
    'roomba': ['bin'],
    'braava': ['detectedPad', 'mopReady', 'padWetness']
  };
  version = version || 2;
  emitIntervalTime = emitIntervalTime || 800;
  var robotState = {};
  var cap = null;
  var model = 'roomba';
  var missionInterval;

  const url = 'tls://' + host;

  var options = {
    port: 8883,
    clientId: user,
    rejectUnauthorized: false,
    protocolId: 'MQTT',
    protocolVersion: 4,
    ciphers: process.env.ROBOT_CIPHERS || 'AES128-SHA256',
    clean: false,
    username: user,
    password: password
  };

  const client = mqtt.connect(url, options);

  client.on('error', function (e) {
    throw e;
  });

  client.on('connect', function () {
    missionInterval = setInterval(() => {
      if (robotState.cleanMissionStatus) {
        client.emit('mission', filterProps(['cleanMissionStatus', 'pose', 'bin']));
      }
    }, emitIntervalTime);
  });

  client.on('close', function () {
    clearInterval(missionInterval);
  });

  client.on('packetreceive', function (packet) {
    if (packet.payload) {
      try {
        const msg = JSON.parse(packet.payload.toString());
        robotState = Object.assign(robotState, msg.state.reported);
        client.emit('update', msg);
        client.emit('state', robotState);
        if (robotState.cap) {
          cap = {};
          cap = Object.assign(cap, robotState.cap);
        }
        if (robotState.sku && robotState.sku.toLowerCase().startsWith("m6")) {
          model = 'braava';
        }
      } catch (e) {}
    }
  });

  function _apiCall (topic, command, additionalArgs) {
    return new Promise((resolve, reject) => {
      let cmd = {command: command, time: Date.now() / 1000 | 0, initiator: 'localApp'};
      if (topic === 'delta') {
        cmd = {'state': command};
      }
      if (additionalArgs) {
        cmd = Object.assign(cmd, additionalArgs);
      }
      client.publish(topic, JSON.stringify(cmd), function (e) {
        if (e) return reject(e);
        resolve({ok: null}); // for retro compatibility
      });
    });
  }

  function hasAllProps (obj, properties) {
    for (var p in properties) {
      if (posibleCap.indexOf(properties[p]) > -1 && cap && Object.keys(cap).indexOf(properties[p]) === -1) {
        obj[properties[p]] = undefined; // asking for a non available capability, just set to undefined
      }
      for (var ver in versionProps) {
        if (ver != version && versionProps[ver].indexOf(properties[p]) > -1) {
          obj[properties[p]] = undefined; // this is a property for a different version of API
        }
      }
      for (var mod in modelProps) {
        if (mod != model && modelProps[mod].indexOf(properties[p]) > -1) {
          obj[properties[p]] = undefined; // this is a property for a different model
        }
      }
      if (!obj.hasOwnProperty(properties[p])) {
        return false;
      }
    }
    return true;
  }

  function filterProps (properties) {
    let ret = {};
    if (properties.length === 1) return robotState[properties[0]];
    for (var p in properties) {
      ret[properties[p]] = robotState[properties[p]];
    }
    return ret;
  }

  function waitPreferences (decode, waitFor, returnOnlyThat) {
    waitFor = (typeof waitFor === 'string') ? [waitFor] : waitFor;
    return new Promise((resolve) => {
      var checkInterval = setInterval(() => {
        if (hasAllProps(robotState, waitFor)) {
          clearInterval(checkInterval);
          resolve(returnOnlyThat ? filterProps(waitFor) : robotState);
        }
      }, 100);
    });
  }

  return Object.assign(client, {
    getTime: () => waitPreferences(false, ['utctime'], true),
    getBbrun: () => waitPreferences(false, ['bbrun'], true),
    getLangs: () => waitPreferences(false, ['langs'], true),
    getSys: () => waitPreferences(false, ['bbrstinfo', 'cap', 'sku', 'batteryType', 'soundVer', 'uiSwVer', 'navSwVer', 'wifiSwVer', 'mobilityVer', 'bootloaderVer', 'umiVer', 'softwareVer', 'audio', 'bin', 'subModSwVer', 'secureBoot', 'detectedPad'], true),
    getWirelessLastStatus: () => waitPreferences(false, ['wifistat', 'wlcfg'], true),
    getWeek: () => waitPreferences(false, ['cleanSchedule', 'cleanSchedule2'], true),
    getPreferences: (decode) => waitPreferences(decode, ['cleanMissionStatus', 'cleanSchedule', 'cleanSchedule2', 'name', 'vacHigh', 'signal'], false),
    getRobotState: (fields) => waitPreferences(false, fields, false),
    getMission: (decode) => waitPreferences(decode, ['cleanMissionStatus', 'pose', 'bin', 'batPct', 'detectedPad', 'mopReady', 'padWetness'], true),
    getBasicMission: (decode) => waitPreferences(decode, ['cleanMissionStatus', 'bin', 'batPct', 'detectedPad', 'mopReady', 'padWetness'], true),
    getWirelessConfig: () => waitPreferences(false, ['wlcfg', 'netinfo'], true),
    getWirelessStatus: () => waitPreferences(false, ['wifistat', 'netinfo'], true),
    getModel: () => new Promise((resolve) => resolve(model)),
    getCloudConfig: () => waitPreferences(false, ['cloudEnv'], true),
    getSKU: () => waitPreferences(false, ['sku'], true),
    start: () => _apiCall('cmd', 'start'),
    clean: () => _apiCall('cmd', 'clean'),
    cleanRoom: (args) => _apiCall('cmd', 'start', args),
    pause: () => _apiCall('cmd', 'pause'),
    stop: () => _apiCall('cmd', 'stop'),
    resume: () => _apiCall('cmd', 'resume'),
    dock: () => _apiCall('cmd', 'dock'),
    evac: () => _apiCall('cmd', 'evac'),
    train: () => _apiCall('cmd', 'train'),
    setWeek: (args) => _apiCall('delta', {cleanSchedule: args}),
    setPreferences: (args) => _apiCall('delta', args),
    setCarpetBoostAuto: () => _apiCall('delta', {'carpetBoost': true, 'vacHigh': false}),
    setCarpetBoostPerformance: () => _apiCall('delta', {'carpetBoost': false, 'vacHigh': true}),
    setCarpetBoostEco: () => _apiCall('delta', {'carpetBoost': false, 'vacHigh': false}),
    setEdgeCleanOn: () => _apiCall('delta', {'openOnly': false}),
    setEdgeCleanOff: () => _apiCall('delta', {'openOnly': true}),
    setCleaningPassesAuto: () => _apiCall('delta', {'noAutoPasses': false, twoPass: false}),
    setCleaningPassesOne: () => _apiCall('delta', {'noAutoPasses': true, twoPass: false}),
    setCleaningPassesTwo: () => _apiCall('delta', {'noAutoPasses': true, twoPass: true}),
    setAlwaysFinishOn: () => _apiCall('delta', {'binPause': false}),
    setAlwaysFinishOff: () => _apiCall('delta', {'binPause': true})
  });
};

module.exports = dorita980;
