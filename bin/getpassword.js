'use strict';

const request = require('request');

if (!process.argv[2]) {
  console.log('Use: npm run getpassword <robot_ip_address>');
  process.exit();
}

const host = process.argv[2];

console.log('Make sure your robot is on the Home Base and powered on (green lights on). Then press and hold the HOME button on your robot until it plays a series of tones (about 2 seconds). Release the button and your robot will flash WIFI light. Then wait and look here...');

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

function check (rid) {
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
      setTimeout(function () { check(++rid); }, 2000);
    } else if (response.statusCode === 200) {
      console.log('========>');
      let pass = JSON.parse(body).ok.passwd;
      console.log('Good job!');
      console.log('Password: ' + pass);
      getBlid(++rid, pass);
    } else {
      console.log('Unespected response. Checking again...');
      setTimeout(function () { check(++rid); }, 2000);
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

check(1);
