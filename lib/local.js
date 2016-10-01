'use strict';

const request = require('request-promise');

var dorita980 = function (user, password, host) {
  if (!user) throw new Error('robotID is required.');
  if (!password) throw new Error('password is required.');
  if (!host) throw new Error('host is required.');

  var rid = 0;

  var requestOptions = {
    'method': 'POST',
    'uri': 'https://' + host + ':443/umi',
    'strictSSL': false,
    'headers': {
      'Content-Type': 'application/json',
      'Connection': 'close',
      'User-Agent': 'aspen%20production/2618 CFNetwork/758.3.15 Darwin/15.4.0',
      'Content-Encoding': 'identity',
      'Authorization': 'Basic ' + new Buffer('user:' + password).toString('base64'),
      'Accept': '*/*',
      'Accept-Language': 'en-us',
      'Host': host
    }
  };

  function _apiCall (method, command, args) {
    rid++;
    if (rid > 1000) rid = 1;

    requestOptions.body = '{"do":"' + method + '","args":["' + command + '"' + (args ? ', ' + JSON.stringify(args) : '') + '],"id":' + rid + '}';

    return request(requestOptions).then(JSON.parse);
  }

  function _setPreferences (and, or) {
    return _apiCall('get', 'prefs').then(function (resp) {
      if (and) resp.ok.flags = resp.ok.flags & and;
      if (or) resp.ok.flags = resp.ok.flags | or;
      return _apiCall('set', 'prefs', resp.ok);
    });
  }

  function _getPreferences (decode) {
    if (decode === false) return _apiCall('get', 'prefs');
    return _apiCall('get', 'prefs').then(function (resp) {
      if ('ok' in resp) resp.ok.cleaningPreferences = decodeCleaningPreferences(resp.ok.flags);
      return resp;
    });
  }

  function decodeCleaningPreferences (flags) {
    let carpetBoostOptions = {
      '0': 'auto',
      '16': 'eco',
      '80': 'performance'
    };
    return {
      carpetBoost: carpetBoostOptions[(flags & 80)],
      edgeClean: !(flags & 2),
      cleaningPasses: (flags & 1) ? 2 : 1,
      alwaysFinish: !(flags & 32)
    };
  }

  return {
    decodeCleaningPreferences: decodeCleaningPreferences,
    getTime: () => _apiCall('get', 'time'),
    getBbrun: () => _apiCall('get', 'bbrun'),
    getLangs: () => _apiCall('get', 'langs'),
    getSys: () => _apiCall('get', 'sys'),
    getWirelessLastStatus: () => _apiCall('get', 'wllaststat'),
    getWeek: () => _apiCall('get', 'week'),
    getPreferences: (decode) => _getPreferences(decode),
    getMission: () => _apiCall('get', 'mssn'),
    getWirelessConfig: () => _apiCall('get', 'wlcfg'),
    getWirelessStatus: () => _apiCall('get', 'wlstat'),
    getCloudConfig: () => _apiCall('get', 'cloudcfg'),
    getSKU: () => _apiCall('get', 'sku'),
    start: () => _apiCall('set', 'cmd', {'op': 'start'}),
    pause: () => _apiCall('set', 'cmd', {'op': 'pause'}),
    stop: () => _apiCall('set', 'cmd', {'op': 'stop'}),
    resume: () => _apiCall('set', 'cmd', {'op': 'resume'}),
    dock: () => _apiCall('set', 'cmd', {'op': 'dock'}),
    setWeek: (args) => _apiCall('set', 'week', args),
    setTime: (args) => _apiCall('set', 'time', args),
    setPtime: (args) => _apiCall('set', 'ptime', args),
    setPreferences: (args) => _apiCall('set', 'prefs', args),
    setCarpetBoostAuto: () => _setPreferences(65455),
    setCarpetBoostPerformance: () => _setPreferences(null, 80),
    setCarpetBoostEco: () => _setPreferences(65471, 16),
    setEdgeCleanOn: () => _setPreferences(65533),
    setEdgeCleanOff: () => _setPreferences(null, 2),
    setCleaningPassesOne: () => _setPreferences(65534),
    setCleaningPassesTwo: () => _setPreferences(null, 1),
    setAlwaysFinishOn: () => _setPreferences(65503),
    setAlwaysFinishOff: () => _setPreferences(null, 32)
  };
};

module.exports = dorita980;
