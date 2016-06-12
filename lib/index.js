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

  function apiCall (command) {
    requestOptions.uri = `https://irobot.axeda.com/services/v1/rest/Scripto/execute/AspenApiRequest?blid=${user}&robotpwd=${password}&method=${command}`;
    return request(requestOptions).then(JSON.parse);
  }

  return {
    getStatus: () => apiCall('getStatus'),
    accumulatedHistorical: () => apiCall('accumulatedHistorical'),
    missionHistory: () => apiCall('missionHistory')
  };
};

module.exports = dorita980;
