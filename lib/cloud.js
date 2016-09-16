'use strict';

const request = require('request-promise');

var dorita980 = function (user, password) {
  if (!user) throw new Error('robotID is require.');
  if (!password) throw new Error('password is require.');

  var requestOptions = {
    'method': 'GET',
    headers: {
      'User-Agent': 'aspen%20production/2618 CFNetwork/758.3.15 Darwin/15.4.0',
      'Accept': '*/*',
      'Accept-Language': 'en-us',
      'ASSET-ID': 'ElPaso@irobot!' + user
    }
  };

  function apiCall (command, value, args) {
    requestOptions.uri = `https://irobot.axeda.com/services/v1/rest/Scripto/execute/AspenApiRequest?blid=${user}&robotpwd=${password}&method=${command}`;
    if (value) {
      requestOptions.uri += '&value=%7B%0A%20%20%22remoteCommand%22%20:%20%22' + value + '%22%0A%7D';
    }

    return request(requestOptions).then(JSON.parse);
  }

  return {
    getStatus: () => apiCall('getStatus'),
    accumulatedHistorical: () => apiCall('accumulatedHistorical'),
    missionHistory: () => apiCall('missionHistory'),
    clean: () => apiCall('multipleFieldSet', 'clean'),
    quick: () => apiCall('multipleFieldSet', 'quick'),
    spot: () => apiCall('multipleFieldSet', 'spot'),
    dock: () => apiCall('multipleFieldSet', 'dock'),
    start: () => apiCall('multipleFieldSet', 'start'),
    pause: () => apiCall('multipleFieldSet', 'pause'),
    resume: () => apiCall('multipleFieldSet', 'resume'),
    stop: () => apiCall('multipleFieldSet', 'stop'),
    wake: () => apiCall('multipleFieldSet', 'wake'),
    reset: () => apiCall('multipleFieldSet', 'reset'),
    find: () => apiCall('multipleFieldSet', 'find'),
    wipe: () => apiCall('multipleFieldSet', 'wipe'),
    patch: () => apiCall('multipleFieldSet', 'patch'),
    dlpkg: () => apiCall('multipleFieldSet', 'dlpkg'),
    rechrg: () => apiCall('multipleFieldSet', 'rechrg'),
    wlapon: () => apiCall('multipleFieldSet', 'wlapon'),
    wlapoff: () => apiCall('multipleFieldSet', 'wlapoff'),
    wlston: () => apiCall('multipleFieldSet', 'wlston'),
    wlstoff: () => apiCall('multipleFieldSet', 'wlstoff'),
    wifiscan: () => apiCall('multipleFieldSet', 'wifiscan'),
    ipdone: () => apiCall('multipleFieldSet', 'ipdone'),
    provdone: () => apiCall('multipleFieldSet', 'provdone'),
    bye: () => apiCall('multipleFieldSet', 'bye'),
    wllogflush: () => apiCall('multipleFieldSet', 'wllogflush'),
    sleep: () => apiCall('multipleFieldSet', 'sleep'),
    off: () => apiCall('multipleFieldSet', 'off'),
    fbeep: () => apiCall('multipleFieldSet', 'fbeep')
  };
};

module.exports = dorita980;
