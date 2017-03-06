'use strict';
let cloudV1 = require('./lib/v1/cloud');
let cloudV2 = require('./lib/v2/cloud');

let localV1 = require('./lib/v1/local');
let localV2 = require('./lib/v2/local');

let discovery = require('./lib/discovery');

function cloud (username, password, version) {
  if (version === 1) return cloudV1(username, password);
  return cloudV2(username, password);
}

function local (username, password, ip, version, interval) {
  if (version === 1) return localV1(username, password, ip);
  return localV2(username, password, ip, interval);
}

module.exports = {
  Cloud: cloud,
  Local: local,
  getRobotIP: discovery.discovery,
  discovery: (cb) => discovery.discovery(cb, true),
  getRobotPublicInfo: discovery.getRobotPublicInfo
};
