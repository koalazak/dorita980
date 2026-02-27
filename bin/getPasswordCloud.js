#!/usr/bin/env node

'use strict';

const request = require('request');

if (!process.argv[2] || !process.argv[3]) {
  console.log('Usage: npm run get-password-cloud <iRobot username> <iRobot password> [Gigya API Key]');
  process.exit();
}

const username = process.argv[2];
const password = process.argv[3];
const apiKeyOverride = process.argv[4] || process.env.GIGYA_API_KEY;
const countryCode = process.env.IROBOT_COUNTRY_CODE || 'US';
const discoveryUrl = process.env.IROBOT_DISCOVERY_URL ||
  'https://disc-prod.iot.irobotapi.com/v1/discover/endpoints?country_code=' + countryCode;

getEndpoints(function (error, endpoints) {
  if (error) {
    console.log('Fatal error discovering iRobot endpoints. Please check your network or override env vars.');
    console.log(error);
    process.exit(1);
  }

  const gigyaLoginOptions = {
    'method': 'POST',
    'uri': endpoints.gigyaBase + '/accounts.login',
    'json': true,
    'form': {
      'apiKey': endpoints.apiKey,
      'targetenv': 'mobile',
      'loginID': username,
      'password': password,
      'format': 'json',
      'targetEnv': 'mobile'
    },
    'headers': {
      'Connection': 'close'
    }
  };

  request(gigyaLoginOptions, function (err, response, body) {
    loginGigyaResponseHandler(err, response, body, endpoints);
  });
});

function loginGigyaResponseHandler (error, response, body, endpoints) {
  if (error) {
    console.log('Fatal error login into Gigya API. Please check your credentials or Gigya API Key.');
    console.log(error);
    process.exit(1);
  }

  if (response.statusCode === 401 || response.statusCode === 403) {
    console.log('Authentication error. Check your credentials.');
    console.log(response);
    process.exit(1);
  } else if (response.statusCode === 400) {
    console.log(response);
    process.exit(1);
  } else if (response.statusCode === 200) {
    if (body && body.statusCode && body.statusCode === 403) {
      console.log('Authentication error. Please check your credentials.');
      console.log(body);
      process.exit(1);
    }
    if (body && body.statusCode && body.statusCode === 400) {
      console.log('Error login into Gigya API.');
      console.log(body);
      process.exit(1);
    }
    if (body && body.statusCode && body.statusCode === 200 && body.errorCode === 0 && body.UID && body.UIDSignature && body.signatureTimestamp && body.sessionInfo && body.sessionInfo.sessionToken) {
      const iRobotLoginOptions = {
        'method': 'POST',
        'uri': endpoints.httpBase + '/v2/login',
        'json': true,
        'body': {
          'app_id': 'ANDROID-C7FB240E-DF34-42D7-AE4E-A8C17079A294',
          'assume_robot_ownership': 0,
          'gigya': {
            'signature': body.UIDSignature,
            'timestamp': body.signatureTimestamp,
            'uid': body.UID
          }
        },
        'headers': {
          'Connection': 'close'
        }
      };
      request(iRobotLoginOptions, loginIrobotResponseHandler);
    } else {
      console.log('Error login into iRobot account. Missing fields in login response.');
      console.log(body);
      process.exit(1);
    }
  } else {
    console.log('Unespected response. Checking again...');
  }
}

function loginIrobotResponseHandler (error, response, body) {
  if (error) {
    console.log('Fatal error login into iRobot account. Please check your credentials or API Key.');
    console.log(error);
    process.exit(1);
  }
  if (body && body.robots) {
    const robotCount = Object.keys(body.robots).length;
    console.log('Found ' + robotCount + ' robot(s)!');
    Object.keys(body.robots).map(function (r) {
      console.log('Robot "' + body.robots[r].name + '" (sku: ' + body.robots[r].sku + ' SoftwareVer: ' + body.robots[r].softwareVer + '):');
      console.log('BLID=> ' + r);
      console.log('Password=> ' + body.robots[r].password + ' <= Yes, all this string.');
      console.log('');
    });
    console.log('Use this credentials in dorita980 lib :)');
  } else {
    console.log('Fatal error login into iRobot account. Please check your credentials or API Key.');
    console.log(body);
    process.exit(1);
  }
}

function getEndpoints (cb) {
  if (apiKeyOverride && process.env.GIGYA_BASE && process.env.IROBOT_HTTP_BASE) {
    return cb(null, {
      apiKey: apiKeyOverride,
      gigyaBase: process.env.GIGYA_BASE,
      httpBase: process.env.IROBOT_HTTP_BASE
    });
  }
  discoverEndpoints(cb);
}

function discoverEndpoints (cb) {
  request({ method: 'GET', uri: discoveryUrl, json: true }, function (error, response, body) {
    if (error) return cb(error);
    if (!response || response.statusCode >= 400) return cb(body || response);

    const gigya = body && body.gigya ? body.gigya : {};
    const deployments = body && body.deployments ? body.deployments : {};
    const apiKey = apiKeyOverride || gigya.api_key;
    const datacenter = gigya.datacenter_domain;
    const gigyaBase = process.env.GIGYA_BASE || (datacenter ? ('https://accounts.' + datacenter) : 'https://accounts.us1.gigya.com');
    const httpBase = process.env.IROBOT_HTTP_BASE || pickHttpBase(deployments) || body.httpBase || 'https://unauth2.prod.iot.irobotapi.com';

    if (!apiKey) return cb(new Error('No Gigya API key in discovery response'));
    cb(null, { apiKey: apiKey, gigyaBase: gigyaBase, httpBase: httpBase });
  });
}

function pickHttpBase (deployments) {
  const keys = Object.keys(deployments || {}).sort().reverse();
  for (var i = 0; i < keys.length; i++) {
    const dep = deployments[keys[i]];
    if (dep && dep.httpBase) return dep.httpBase;
  }
  return null;
}
