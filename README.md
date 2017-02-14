# dorita980
[![Build Status](https://travis-ci.org/koalazak/dorita980.svg?branch=master)](https://travis-ci.org/koalazak/dorita980)
[![dependencies Status](https://david-dm.org/koalazak/dorita980/status.svg)](https://david-dm.org/koalazak/dorita980)
[![npm version](https://badge.fury.io/js/dorita980.svg)](http://badge.fury.io/js/dorita980)

Unofficial iRobot Roomba 980 node.js library (SDK).

With this library you can send commands to your Roomba 980 through the iRobot cloud API or directly from your LAN and integrate your roboot with your own Home Automation or IoT project.

See [rest980](https://github.com/koalazak/rest980) if you need a HTTP REST API interface.

# Firmware 2.0.0 documentation

All this document is only for firmware 2.0.0. [Check your robot version!](http://homesupport.irobot.com/app/answers/detail/a_id/529)

If you have firmware version 1.6.6 [click here](https://github.com/koalazak/dorita980/blob/master/READMEv1.6.6.md) to see the old documentation.

There are some breaking changes between 1.6.6 and 2.0.0 in this API (dorita980 v2 and v3).

# Features

- Get your username/password easily
- Auto discovery robot IP (optional)
- Local API control (from your LAN)
- Simplified Cleaning Preferences settings.
- Firmware 2.0.0 compatible.
- See [rest980](https://github.com/koalazak/rest980) if you need a HTTP REST API interface to use dorita980 throw.


[![iRobot Roomba 980 cleaning map using dorita980 lib](https://img.youtube.com/vi/XILvHFEX7TM/0.jpg)](https://www.youtube.com/watch?v=XILvHFEX7TM)

Video: Realtime cleaning map using dorita980 lib in [rest980](https://github.com/koalazak/rest980).

# Install

First you need node.js installed and then:

```bash
$ npm install dorita980 --save
```

# Quick start via Local request on your LAN
You can control the robot from your local network.

Create `myapp.js` file with this content:

```javascript
var dorita980 = require('dorita980');

var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address

myRobotViaLocal.on('connect', function () {
  myRobotViaLocal.start().then(() => {
    myRobotViaLocal.end(); // disconnect to leave free the channel for the mobile app.
  }).catch((err) => {
    console.log(err);
  });
});

```

Then install `dorita980` using `npm` and run your program:

```bash
$ npm install dorita980 --save
$ node myapp.js
```

# Examples

Pause the robot via Local request:

```javascript
var dorita980 = require('dorita980');

var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address 

myRobotViaLocal.on('connect', function () {
  // Pause!
  myRobotViaLocal.pause().then(() => {
    myRobotViaLocal.end(); // disconnect to leave free the channel for the mobile app.
  }).catch((err) => {
    console.log(err);
  });
});
```

Get robot week schedule

```javascript
var dorita980 = require('dorita980');

var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address 

myRobotViaLocal.on('connect', function () {
  myRobotViaLocal.getWeek().then((weekConfig) => {
    console.log(weekConfig)
    myRobotViaLocal.end(); // disconnect to leave free the channel for the mobile app.
  }).catch((err) => {
    console.log(err);
  });
});
```

# How to get your username/blid and password
(Needed for Cloud and Local requests)

Not implemented yet in Firmware 2.0.0. Sniff your network data to get your password.


# Auto discover IP address for local request:

If you dont known the robot IP address to use in `dorita980.Local()` you can use `dorita980.getRobotIP()` to find it.
This process takes 1 or 2 seconds, so if you know the IP just use it explicity.

```javascript
var dorita980 = require('dorita980');

dorita980.getRobotIP(function (ierr, ip) {
  if (!ierr) {
    var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', ip);

    myRobotViaLocal.getMission().then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  } else {
    console.log('error looking for robot IP');
  }
});
```

# Local API

The library send commands direclty over wifi to your robot. You dont need internet connection.

## Methods

#### `end()`

Close the connection to the robot. Its important if you want to send commands via your mobile app. There's maximum 1 connection at any time, so if your app is connected, the mobile app only works via cloud access.

#### `getRobotState(Array waitForFields)`

Get robot state but wait for `waitForFields` fields before return.

The robot push data to this state all the time. The state object start empty and the robot will increasing the data here over the time.

```javascript
myRobotViaLocal.getRobotState(['batPct', 'bbchg3']).then((actualState) => {
  console.log(actualState);
});
```

Full state should contains:
```javascript

{ netinfo:
   { dhcp: true,
     addr: 4294967040,
     mask: 4294967040,
     gw: 4294967040,
     dns1: 4294967040,
     dns2: 0,
     bssid: '12:12:12:12:12:12',
     sec: 4 },
  wifistat: { wifi: 1, uap: false, cloud: 4 },
  wlcfg: { sec: 7, ssid: '123123123123123123123123' },
  mac: '34:34:34:34:34:34',
  country: 'US',
  cloudEnv: 'prod',
  svcEndpoints: { svcDeplId: 'v005' },
  localtimeoffset: -180,
  utctime: 1487103319,
  pose: { theta: 61, point: { x: 171, y: -113 } },
  batPct: 100,
  dock: { known: true },
  bin: { present: true, full: false },
  audio: { active: false },
  cleanMissionStatus:
   { cycle: 'none',
     phase: 'charge',
     expireM: 0,
     rechrgM: 0,
     error: 0,
     notReady: 0,
     mssnM: 2,
     sqft: 29,
     initiator: 'manual',
     nMssn: 324 },
  language: 2,
  noAutoPasses: false,
  noPP: false,
  ecoCharge: false,
  vacHigh: false,
  binPause: false,
  carpetBoost: true,
  openOnly: false,
  twoPass: false,
  schedHold: false,
  lastCommand: { command: 'dock', time: 1487103424, initiator: 'manual' },
  langs:
   [ { 'en-US': 0 },
     { 'fr-FR': 1 },
     { 'es-ES': 2 },
     { 'de-DE': 3 },
     { 'it-IT': 4 } ],
  bbnav: { aMtrack: 45, nGoodLmrks: 15, aGain: 12, aExpo: 9 },
  bbpanic: { panics: [ 8, 8, 8, 14, 8 ] },
  bbpause: { pauses: [ 15, 0, 0, 0, 0, 0, 0, 0, 0, 17 ] },
  bbmssn:
   { nMssn: 323,
     nMssnOk: 218,
     nMssnC: 99,
     nMssnF: 1,
     aMssnM: 35,
     aCycleM: 31 },
  bbrstinfo: { nNavRst: 41, nMobRst: 0, causes: '0000' },
  cap: { pose: 1, ota: 2, multiPass: 2, carpetBoost: 1 },
  sku: 'R98----',
  batteryType: 'lith',
  soundVer: '31',
  uiSwVer: '4582',
  navSwVer: '01.09.09',
  wifiSwVer: '20902',
  mobilityVer: '5309',
  bootloaderVer: '3580',
  umiVer: '5',
  softwareVer: 'v2.0.0-34',
  tz:
   { events: [ { dt: 0, off: -180 }, { dt: 0, off: -180 }, { dt: 0, off: 0 } ],
     ver: 2 },
  timezone: 'America/Buenos_Aires',
  name: 'robotNAme',
  cleanSchedule:
   { cycle: [ 'none', 'none', 'none', 'none', 'none', 'none', 'none' ],
     h: [ 17, 10, 10, 12, 10, 13, 17 ],
     m: [ 0, 30, 30, 0, 30, 30, 0 ] },
  bbchg3:
   { avgMin: 158,
     hOnDock: 6110,
     nAvail: 1280,
     estCap: 12311,
     nLithChrg: 233,
     nNimhChrg: 0,
     nDocks: 98 },
  bbchg: { nChgOk: 226, nLithF: 0, aborts: [ 4, 4, 4 ] },
  bbswitch: { nBumper: 55889, nClean: 300, nSpot: 47, nDock: 98, nDrops: 300 },
  bbrun:
   { hr: 211,
     min: 48,
     sqft: 566,
     nStuck: 17,
     nScrubs: 85,
     nPicks: 592,
     nPanics: 178,
     nCliffsF: 1532,
     nCliffsR: 2224,
     nMBStll: 0,
     nWStll: 1,
     nCBump: 0 },
  bbsys: { hr: 6522, min: 54 },
  signal: { rssi: -43, snr: 40 } }

```

#### `getPreferences()`

Get full robot state but wait for ['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose'] fields before return.

Alias for `getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose', 'signal'])`

Waiting for 'signal' we are sure we have the full state object.

#### `setPreferences(newPreferences)`

Partial overwrite the robot state to configure it.

```javascript
var newPreferences = { 
 binPause: false
};

myRobotViaLocal.setPreferences(newPreferences)
```

Response:

```javascript
{"ok":null}
```


#### `getMission()`
With this you can draw a map :)

```javascript
{ cleanMissionStatus:
   { cycle: 'none',
     phase: 'charge',
     expireM: 0,
     rechrgM: 0,
     error: 0,
     notReady: 0,
     mssnM: 15,
     sqft: 0,
     initiator: 'localApp',
     nMssn: 323 },
  pose: { theta: -160, point: { x: 166, y: -11 } } }
```

#### `getWirelessStatus()`
```javascript
{ wifistat: { wifi: 1, uap: false, cloud: 4 },
  netinfo:
   { dhcp: true,
     addr: 3232235880,
     mask: 4294967040,
     gw: 3232235777,
     dns1: 3232235777,
     dns2: 0,
     bssid: 'c0:56:27:70:3b:fe',
     sec: 4 } }
```

#### `getTime()`
```javascript
1487100141
```

#### `getBbrun()`
```javascript
 { hr: 211,
   min: 48,
   sqft: 566,
   nStuck: 17,
   nScrubs: 85,
   nPicks: 592,
   nPanics: 178,
   nCliffsF: 1532,
   nCliffsR: 2224,
   nMBStll: 0,
   nWStll: 1,
   nCBump: 0 }
```

#### `getLangs()`
```javascript
 [ { 'en-US': 0 },
   { 'fr-FR': 1 },
   { 'es-ES': 2 },
   { 'de-DE': 3 },
   { 'it-IT': 4 } ]
```

#### `getSys()`

```javascript
{ bbrstinfo: { nNavRst: 41, nMobRst: 0, causes: '0000' },
  cap: { pose: 1, ota: 2, multiPass: 2, carpetBoost: 1 },
  sku: 'R98----',
  batteryType: 'lith',
  soundVer: '31',
  uiSwVer: '4582',
  navSwVer: '01.09.09',
  wifiSwVer: '20902',
  mobilityVer: '5309',
  bootloaderVer: '3580',
  umiVer: '5',
  softwareVer: 'v2.0.0-34',
  audio: { active: false },
  bin: { present: true, full: false } }
```

#### `getWirelessLastStatus()`
```javascript
{ wifi: 1, uap: false, cloud: 4 },
  wlcfg: { sec: 7, ssid: '1234567890796857336364' }
```

#### `getWeek()`
Monday disable and every day start at 10:30am
```javascript
{ cycle: [ 'none', 'none', 'none', 'none', 'none', 'none', 'none' ],
  h: [ 17, 10, 10, 12, 10, 13, 17 ],
  m: [ 0, 30, 30, 0, 30, 30, 0 ] }
```

#### `setWeek(newWeek)`

Disable Sunday and set every day at 10:30am
```javascript
var newWeek = {"cycle":["none","start","start","start","start","start","start"],"h":[10,10,10,10,10,10,10],"m":[30,30,30,30,30,30,30]}
myRobotViaLocal.setWeek(newWeek)
```

Response:

```javascript
{"ok":null}
```

#### `getCloudConfig()`
```javascript
prod
```

#### `start()`
```javascript
{"ok":null}
```

#### `pause()`
```javascript
{"ok":null}
```

#### `stop()`
```javascript
{"ok":null}
```

#### `resume()`
```javascript
{"ok":null}
```

#### `dock()`
Note: before dock you need to pause() or stop() your robot.
```javascript
{"ok":null}
```

## Simplifications to set Cleaning Preferences:
This methods use setPreferences() with the correct `flags` for each setting.

#### `setCarpetBoostAuto()`
```javascript
{"ok":null}
```

#### `setCarpetBoostPerformance()`

#### `setCarpetBoostEco()`

#### `setEdgeCleanOn()`

#### `setEdgeCleanOff()`

#### `setCleaningPassesAuto()`

#### `setCleaningPassesOne()`

#### `setCleaningPassesTwo()`

#### `setAlwaysFinishOn()`

#### `setAlwaysFinishOff()`


## Events

#### `connect` event

Emitted on successful Connection.

`function () {}`

Put your code inside this callback.

#### `close` event

Emitted after a disconnection.

#### `offline`

Emitted when the client goes offline.


#### `update` event

Emitted every time the Robot publish a new message to the mqtt bus.

`function (data) {}`

- `data` Data published by the Robot

```javascript
myRobotViaLocal.on('update', function (data) {
 console.log(data);
});
```
Will print:
```javascript
{ state:
   { reported:
      { soundVer: '31',
        uiSwVer: '4582',
        navSwVer: '01.09.09',
        wifiSwVer: '20902',
        mobilityVer: '5309',
        bootloaderVer: '3580',
        umiVer: '5',
        softwareVer: 'v2.0.0-34' } } }
```

#### `mission` event

Emitted every `emitIntervalTime` milliseconds with the mission data. (util for mapping)

`function (data) {}`

- `data` Mission data with `cleanMissionStatus` and `pose` state properties.

```javascript
var cleanMissionStatus = 300; // default is 800ms
var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104', 2, cleanMissionStatus); // Note Firmware version.

myRobotViaLocal.on('mission', function (data) {
  console.log(data);
});
```
Will print each 300ms:

```javascript
{ cleanMissionStatus:
   { cycle: 'none',
     phase: 'charge',
     expireM: 0,
     rechrgM: 0,
     error: 0,
     notReady: 0,
     mssnM: 15,
     sqft: 0,
     initiator: 'localApp',
     nMssn: 323 },
  pose: { theta: -160, point: { x: 166, y: -11 } } }
```

#### `state` event

Emitted every time the Robot publish a new message to the mqtt bus. 

`function (data) {}`

- `data` Full robot state object

```javascript
myRobotViaLocal.on('state', function (data) {
 console.log(data);
});
```
Will print the Full robot state!

# Cloud API

Not implemented yet in Firmware 2.0.0

## Note for node.js v0.10 users

dorita980 is compatible with node.js > 4.0 But you can use the [getpassword](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) feature in node.js < 4.0 using `--harmony` flag like that:

```bash
$ node --harmony ./bin/getpassword.js "192.168.1.104"
```


## Author

- [Facu ZAK](https://github.com/koalazak) 
