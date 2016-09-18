'use strict';
let cloud = require('./lib/cloud');
let local = require('./lib/local');
let discovery = require('./lib/discovery');

module.exports = {
  Cloud: cloud,
  Local: local,
  getRobotIP: discovery
};
