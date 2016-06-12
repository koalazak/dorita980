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

  function apiCall (command, value) {
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
    start: () => apiCall('multipleFieldSet', 'start'),
    stop: () => apiCall('multipleFieldSet', 'stop'),
    resume: () => apiCall('multipleFieldSet', 'resume'),
    pause: () => apiCall('multipleFieldSet', 'pause'),
    dock: () => apiCall('multipleFieldSet', 'dock'),
    find: () => apiCall('multipleFieldSet', 'find'),
    clean: () => apiCall('multipleFieldSet', 'clean'),
    fbeep: () => apiCall('multipleFieldSet', 'fbeep'),
    off: () => apiCall('multipleFieldSet', 'off'),
    wake: () => apiCall('multipleFieldSet', 'wake')
  };
};

module.exports = dorita980;
