'use strict';

const request = require('request-promise');

var dorita980 = function (user, password, host) {
  if (!host) throw new Error('host is require.');
  if (!user) throw new Error('robotID is require.');
  if (!password) throw new Error('password is require.');

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

  function apiCall (method, command, args) {
    rid++;
    if (rid > 1000) rid = 1;

    requestOptions.body = '{"do":"' + method + '","args":["' + command + '"' + (args ? ', ' + JSON.stringify(args) : '') + '],"id":' + rid + '}';

    return request(requestOptions).then(JSON.parse);
  }

  function preferences (and, or) {
    return apiCall('get', 'prefs').then(function (resp) {
      if (and !== null) resp.ok.flags = resp.ok.flags & and;
      if (or !== null) resp.ok.flags = resp.ok.flags | or;
      return apiCall('set', 'prefs', resp.ok);
    });
  }

  return {
    getTime: () => apiCall('get', 'time'),
    getBbrun: () => apiCall('get', 'bbrun'),
    getLangs: () => apiCall('get', 'langs'),
    getSys: () => apiCall('get', 'sys'),
    getWirelessLastStatus: () => apiCall('get', 'wllaststat'),
    getWeek: () => apiCall('get', 'week'),
    getPreferences: () => apiCall('get', 'prefs'),
    getMission: () => apiCall('get', 'mssn'),
    getWirelessConfig: () => apiCall('get', 'wlcfg'),
    getWirelessStatus: () => apiCall('get', 'wlstat'),
    getCloudConfig: () => apiCall('get', 'cloudcfg'),
    getSKU: () => apiCall('get', 'sku'),
    start: () => apiCall('set', 'cmd', {'op': 'start'}),
    pause: () => apiCall('set', 'cmd', {'op': 'pause'}),
    stop: () => apiCall('set', 'cmd', {'op': 'stop'}),
    resume: () => apiCall('set', 'cmd', {'op': 'resume'}),
    dock: () => apiCall('set', 'cmd', {'op': 'dock'}),
    setWeek: (args) => apiCall('set', 'week', args),
    setTime: (args) => apiCall('set', 'time', args),
    setPtime: (args) => apiCall('set', 'ptime', args),
    setPreferences: (args) => apiCall('set', 'prefs', args),
    setCarpetBoostAuto: () => preferences(65455),
    setCarpetBoostPerformance: () => preferences(null, 80),
    setCarpetBoostEco: () => preferences(65471, 16),
    setEdgeCleanOn: () => preferences(65533),
    setEdgeCleanOff: () => preferences(null, 2),
    setCleaningPassesOne: () => preferences(65534),
    setCleaningPassesTwo: () => preferences(null, 1),
    setAlwaysFinishOn: () => preferences(65503),
    setAlwaysFinishOff: () => preferences(null, 32)
  };
};

module.exports = dorita980;
