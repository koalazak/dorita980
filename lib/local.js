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

  return {
    getTime: () => apiCall('get', 'time'),
    getBbrun: () => apiCall('get', 'bbrun'),
    getLangs: () => apiCall('get', 'langs'),
    getSys: () => apiCall('get', 'sys'),
    getWirelessLastStatus: () => apiCall('get', 'wllaststat'),
    getWeek: () => apiCall('get', 'week'),
    getPrefs: () => apiCall('get', 'prefs'),
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
    setPreferences: (args) => apiCall('set', 'prefs', args)
  };
};

module.exports = dorita980;
