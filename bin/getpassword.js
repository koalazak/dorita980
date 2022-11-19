#!/usr/bin/env node

'use strict';

const request = require('request');
const tls = require('tls');
const discovery = require('../lib/discovery');

if (!process.argv[2]) {
  console.log('Usage: npm run getpassword <robot_ip_address> [firmware version]');
  process.exit();
}

const host = process.argv[2];
const fversion = process.argv[3];

var requestOptions = {
  'method': 'POST',
  'uri': 'https://' + host + ':443/umi',
  'strictSSL': false,
  'headers': {
    'Content-Type': 'application/json',
    'Connection': 'close',
    'User-Agent': 'aspen%20production/2618 CFNetwork/758.3.15 Darwin/15.4.0',
    'Content-Encoding': 'identity',
    'Accept': '*/*',
    'Accept-Language': 'en-us',
    'Host': host
  }
};

function checkV1 (rid) {
  if (rid === 120) {
    console.log('Timeout getting password. Are you following the instructions? You already setup your robot? Its the robot IP correct?');
    process.exit(1);
  }

  requestOptions.body = '{"do":"get","args":["passwd"],"id":' + rid + '}';

  request(requestOptions, function (error, response, body) {
    if (error) {
      console.log('Fatal error connecting to robot. Please verify the IP address and connectivity:', error);
      process.exit(1);
    }

    if (response.statusCode === 401) {
      setTimeout(function () { checkV1(++rid); }, 2000);
    } else if (response.statusCode === 200) {
      console.log('========>');
      let pass = JSON.parse(body).ok.passwd;
      console.log('Good job!');
      console.log('Password: ' + pass);
      getBlid(++rid, pass);
    } else {
      console.log('Unespected response. Checking again...');
      setTimeout(function () { checkV1(++rid); }, 2000);
    }
  });
}

function getBlid (rid, pass) {
  requestOptions.body = '{"do":"get","args":["sys"],"id":' + rid + '}';
  requestOptions.headers['Authorization'] = 'Basic ' + new Buffer('user:' + pass).toString('base64');

  request(requestOptions, function (error, response, body) {
    if (error) {
      console.log('Fatal error getting username/blid:', error);
      process.exit(1);
    }

    if (response.statusCode === 200) {
      const blid = JSON.parse(body).ok.blid.map(function (dec) {
        return (dec + 0x10000).toString(16).substr(-2).toUpperCase();
      }).join('');

      console.log('Username/blid: ' + blid);
      console.log('Use this credentials in dorita980 lib :)');
    } else {
      console.log('Unespected error getting username/blid');
    }
  });
}

function checkV2 () {
  var sliceFrom = 13;
  discovery.getRobotPublicInfo(host, function (e, robotData) {
    console.log('Robot Data:');
    console.log(robotData);
  });
  const packet = 'f005efcc3b2900';
  var client = tls.connect(8883, host, {timeout: 10000, rejectUnauthorized: false, ciphers: process.env.ROBOT_CIPHERS || 'AES128-SHA256,TLS_AES_256_GCM_SHA384' }, function () {
    client.write(new Buffer(packet, 'hex'));
  });

  client.on('data', function (data) {
    if (data.length === 2) {
      sliceFrom = 9;
      return;
    }
    if (data.length <= 7) {
      console.log('Error getting password. Follow the instructions and try again.');
    } else {
      console.log('Password=> ' + new Buffer(data).slice(sliceFrom).toString() + ' <= Yes, all this string.');
      console.log('Use this credentials in dorita980 lib :)');
    }
    client.end();
    process.exit(0);
  });

  client.setEncoding('utf-8');
}

console.log('Make sure your robot is on the Home Base and powered on (green lights on). Then press and hold the HOME button (or DOCK+SPOT on some models) on your robot until it plays a series of tones (about 2 seconds). Release the button and your robot will flash WIFI light.');

if (fversion === '1') {
  console.log('Then wait and look here...');
  checkV1(1);
} else {
  console.log('Then press any key here...');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', checkV2);
}
