# dorita980
[![Build Status](https://travis-ci.org/koalazak/dorita980.svg?branch=master)](https://travis-ci.org/koalazak/dorita980)
[![npm version](https://badge.fury.io/js/dorita980.svg)](http://badge.fury.io/js/dorita980)

Unofficial iRobot Roomba (i7/i7+, 980, 960, e5, 690, 675, etc) node.js library (SDK).


With this library you can send commands to your wifi enabled Roomba through the iRobot cloud API or directly from your LAN and integrate your roboot with your own Home Automation or IoT project.

See [rest980](https://github.com/koalazak/rest980) if you need a HTTP REST API interface.

# Advice

If you enjoy dorita980 and it works nice for you, I recommend blocking the internet access to your robot to avoid the OTA firmware updates. New firmware changes can cause dorita980 to stop working. Blocking firmware updates can be performed using the parental control options on your router.

When a new firmware is published, you can come here to verify if dorita980 is still compatible. Once dorita980 is compatible you can temporarily enable internet access for your robot to get the firmware upgrade.

If you have firmware version 1.6.x [click here](https://github.com/koalazak/dorita980/blob/master/READMEv1.6.6.md) to see the old documentation.

[Check your robot version!](http://homesupport.irobot.com/app/answers/detail/a_id/529)

# Features

- Compatible robots: all 600, 800, 900, e5 and i7/i7+ series with HOME app and Braava m6.
- Get your username/password easily.
- Auto discovery robot IP (optional).
- Local API control (from your LAN).
- Simplified Cleaning Preferences settings.
- Firmware 1.6.x compatible.
- Firmware 2.x.x compatible (latest serie 900 uses firmware v2, not v3).
- Firmware 3.2.x compatible (latest serie 800 uses firmware v3).
- See [rest980](https://github.com/koalazak/rest980) if you need a HTTP REST API interface to use dorita980 through it.

[![iRobot Roomba 980 cleaning map using dorita980 lib](https://img.youtube.com/vi/XILvHFEX7TM/0.jpg)](https://www.youtube.com/watch?v=XILvHFEX7TM)

Video: Realtime cleaning map using dorita980 lib in [rest980](https://github.com/koalazak/rest980).

## Supported Features by Firmware Version

|                                             | 1.6.x Local | 1.6.x Cloud   |  2.x.x Local  |2.x.x Cloud | 3.x.x Local |
|---------------------------------------------|-------------|---------------|---------------|---------|--------| 
| Clean/Start/Stop/Pause/Dock/Resume/CleanRoom| yes         | yes           | yes           | pending | yes    |
| Get Preferences                             | yes         | yes           | yes           | pending | yes    |
| Set Preferences                             | yes         | yes           | yes           | pending | yes    |
| Get x,y,d Position                          | yes         | yes           | yes           | pending | -      |
| Get Mission                                 | yes         | yes           | yes           | pending | yes    |
| Get Mission number                          | no          | no            | yes           | pending | yes    |
| Get General Info                            | yes         | yes           | yes           | pending | yes    |
| Get Schedule                                | yes         | yes           | yes           | pending | yes    |
| Set Schedule                                | yes         | yes           | yes           | pending | yes    |
| Set CarpetBoost (performance, eco, auto)    | yes         | yes           | yes           | pending | -      |
| Set Edge Clean                              | yes         | yes           | yes           | pending | -      |
| Set Cleaning Passes (auto, on, two)         | yes         | yes           | yes           | pending | -      |
| set Always Finish                           | yes         | yes           | yes           | pending | -      |
| MQTT Custom events                          | -           | -             | yes           | pending | yes    |
| HTTP API                                    | yes         | yes           | -             | -       | -      |
| Discovery Robot IP                          | yes         | -             | yes           | -       | yes    |
| Get BLID and Password                       | yes         | -             | yes           | -       | yes    |
| Support multiples clients at the same time  | yes         | yes           | no            | pending | no     |


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

myRobotViaLocal.on('connect', init);

function init () {
  myRobotViaLocal.clean()
  .then(() => myRobotViaLocal.end()) // disconnect to leave free the channel for the mobile app.
  .catch(console.log);
}

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

myRobotViaLocal.on('connect', init);

function init () {
  myRobotViaLocal.pause()
  .then(() => myRobotViaLocal.end()) // disconnect to leave free the channel for the mobile app.
  .catch(console.log);
}
```

Get robot week schedule

```javascript
var dorita980 = require('dorita980');

var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address 

myRobotViaLocal.on('connect', init);

function init () {
  myRobotViaLocal.getWeek()
  .then((weekConfig) => {
    console.log(weekConfig)
    myRobotViaLocal.end()
  })
  .catch(console.log);
}
```

# How to get your username/blid and password

(Needed for Cloud and Local requests)

You need to know your robot IP address (look in your router or scan your LAN network with nmap to find it). Or use the `dorita980.getRobotIP()` method.

Install `dorita980` globally and then run the `get-roomba-password` command:

```bash
$ npm install -g dorita980
$ get-roomba-password <robotIP>
```

or clone the repo and then run the npm script:

```bash
$ git clone https://github.com/koalazak/dorita980.git
$ cd dorita980
$ npm install
$ npm run getpassword <robotIP>
```

or docker run command:

```
docker run -it node sh -c "npm install -g dorita980 && get-roomba-password <robotIP>"
```

Example Output:

```
$ npm install -g dorita980
$ get-roomba-password 192.168.1.103

Make sure your robot is on the Home Base and powered on. Then press and hold the HOME button on your robot until it plays a series of tones (about 2 seconds). Release the button and your robot will flash WIFI light.
Then press any key...
{ ver: '2',
  hostname: 'Roomba-xxxxxxxxxxxxx',
  robotname: 'Dorita',
  ip: '192.168.1.103',
  mac: '12:12:12:12:12:12',
  sw: 'v2.0.0-34',
  sku: 'R98----',
  nc: 0,
  proto: 'mqtt',
  blid: 'xxxxxxxxxxxxx' <---- username/blid
}
Password=> :1:1486937829:gktkDoYpWaDxCfGh <= Yes, all this string.
Use this credentials in dorita980 lib :)

```

# Auto discover IP address for local request:

If you don't known which IP address to use in `dorita980.Local()` you can use `dorita980.getRobotIP()` to find it.
This process takes 1-2 seconds, so if you know the IP you can just use it explicity.

You need UDP brodcast enable in your network!

```javascript
var dorita980 = require('dorita980');

dorita980.getRobotIP((ierr, ip) => {
  if (ierr) return console.log('error looking for robot IP');

  var myRobotViaLocal = new dorita980.Local('MyUsernameBlid', 'MyPassword', ip);

  myRobotViaLocal.getMission()
  .then((mission) => {
    console.log(mission);
  }).catch((err) => {
    console.log(err);
  });
});
```

You can also use `.discovery` method to get all the robots discovery data:

You need UDP brodcast enabled in your network!

```javascript
var dorita980 = require('dorita980');

dorita980.discovery((ierr, data) => {
  console.log(data);
});
```

Will print:
```
{ ver: '2',
  hostname: 'Roomba-xxxxxxxxxxxxx',
  robotname: 'Dorita',
  ip: '192.168.1.103',
  mac: '12:12:12:12:12:12',
  sw: 'v2.0.0-34',
  sku: 'R98----',
  nc: 0,
  proto: 'mqtt' }
```

# Local API

The library send commands directly over wifi to your robot. You dont need an internet connection.

* <a href="#Local"><code><b>dorita980.Local(blid, password, ip, firmwareVersion)</b></code></a>
* <a href="#end"><code>myRobot.<b>end()</b></code></a>
* <a href="#getRobotState"><code>myRobot.<b>getRobotState(waitForFields)</b></code></a>
* <a href="#getPreferences"><code>myRobot.<b>getPreferences()</b></code></a>
* <a href="#setPreferences"><code>myRobot.<b>setPreferences(newPreferences)</b></code></a>
* <a href="#getMission"><code>myRobot.<b>getMission()</b></code></a>
* <a href="#getBasicMission"><code>myRobot.<b>getBasicMission()</b></code></a>
* <a href="#getWirelessStatus"><code>myRobot.<b>getWirelessStatus()</b></code></a>
* <a href="#getTime"><code>myRobot.<b>getTime()</b></code></a>
* <a href="#getBbrun"><code>myRobot.<b>getBbrun()</b></code></a>
* <a href="#getLangs"><code>myRobot.<b>getLangs()</b></code></a>
* <a href="#getSys"><code>myRobot.<b>getSys()</b></code></a>
* <a href="#getWirelessLastStatus"><code>myRobot.<b>getWirelessLastStatus()</b></code></a>
* <a href="#getWeek"><code>myRobot.<b>getWeek()</b></code></a>
* <a href="#setWeek"><code>myRobot.<b>setWeek(newWeek)</b></code></a>
* <a href="#getCloudConfig"><code>myRobot.<b>getCloudConfig()</b></code></a>
* <a href="#start"><code>myRobot.<b>start()</b></code></a>
* <a href="#clean"><code>myRobot.<b>clean()</b></code></a>
* <a href="#cleanRoom"><code>myRobot.<b>cleanRoom(args)</b></code></a>
* <a href="#cleanRoomMultiple"><code>myRobot.<b>cleanRoom(args) for multiple rooms</b></code></a>
* <a href="#pause"><code>myRobot.<b>pause()</b></code></a>
* <a href="#stop"><code>myRobot.<b>stop()</b></code></a>
* <a href="#resume"><code>myRobot.<b>resume()</b></code></a>
* <a href="#dock"><code>myRobot.<b>dock()</b></code></a>
* <a href="#setCarpetBoostAuto"><code>myRobot.<b>setCarpetBoostAuto()</b></code></a>
* <a href="#setCarpetBoostPerformance"><code>myRobot.<b>setCarpetBoostPerformance()</b></code></a>
* <a href="#setCarpetBoostEco"><code>myRobot.<b>setCarpetBoostEco()</b></code></a>
* <a href="#setEdgeCleanOn"><code>myRobot.<b>setEdgeCleanOn()</b></code></a>
* <a href="#setEdgeCleanOff"><code>myRobot.<b>setEdgeCleanOff()</b></code></a>
* <a href="#setCleaningPassesAuto"><code>myRobot.<b>setCleaningPassesAuto()</b></code></a>
* <a href="#setCleaningPassesOne"><code>myRobot.<b>setCleaningPassesOne()</b></code></a>
* <a href="#setCleaningPassesTwo"><code>myRobot.<b>setCleaningPassesTwo()</b></code></a>
* <a href="#setAlwaysFinishOn"><code>myRobot.<b>setAlwaysFinishOn()</b></code></a>
* <a href="#setAlwaysFinishOff"><code>myRobot.<b>setAlwaysFinishOff()</b></code></a>
* <a href="#connect"><code>myRobot.on(<b>'connect'</b>, callback)</code></a>
* <a href="#close"><code>myRobot.on(<b>'close'</b>, callback)</code></a>
* <a href="#offline"><code>myRobot.on(<b>'offline'</b>, callback)</code></a>
* <a href="#update"><code>myRobot.on(<b>'update'</b>, callback)</code></a>
* <a href="#mission"><code>myRobot.on(<b>'mission'</b>, callback)</code></a>
* <a href="#state"><code>myRobot.on(<b>'state'</b>, callback)</code></a>
* <a href="#publish"><code>myRobot.publish(<b>'topic'</b>, <b>rawJsonMessageAsString</b>, callback)</code></a>

## Methods

<a name="end"></a>
#### `end()`

Close the connection to the robot. It's important if you want to send commands via the official mobile app via Local network. There's a maximum of 1 connection at any time in local network, so if your app is connected, the official mobile app only works via cloud access.

While dorita980 is connected, you can call other methods to send commands and listen for the events to get data. Just call the `.end()` method if you want. While dorita980 is connected, the official mobile app will only work via the cloud to send commands to your robot.

<a name="getRobotState"></a>
#### `getRobotState(Array waitForFields)`

Get the robot state but wait for the `waitForFields` fields before return.

The state object starts empty and the robot will add data over time.

```javascript
myRobotViaLocal.getRobotState(['batPct', 'bbchg3']).then((actualState) => {
  console.log(actualState);
});
```

Full state should contain:
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

<a name="getPreferences"></a>
#### `getPreferences()`

Get the full robot state but wait for the `['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose']` fields before returning.

Alias for `getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose', 'signal'])`

Waits for the 'signal' to make sure we have the full state object.

Use `getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'signal'])` without `pose` in models without navigation like E6 models.

<a name="setPreferences"></a>
#### `setPreferences(newPreferences)`

Partially overwrites the robot state to configure it.

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

<a name="getMission"></a>
#### `getMission()`
With this you can draw a map :) in models with position reporting. Use `getBasicMission()` in robots without position reporting feature like E5 models.

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

<a name="getBasicMission"></a>
#### `getBasicMission()`
Same as `getMission` but don't wait for `pose` information
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
     nMssn: 323 }}
```

<a name="getWirelessStatus"></a>
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

<a name="getTime"></a>
#### `getTime()`
```javascript
1487100141
```

<a name="getBbrun"></a>
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

<a name="getLangs"></a>
#### `getLangs()`
```javascript
 [ { 'en-US': 0 },
   { 'fr-FR': 1 },
   { 'es-ES': 2 },
   { 'de-DE': 3 },
   { 'it-IT': 4 } ]
```

<a name="getSys"></a>
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

<a name="getWirelessLastStatus"></a>
#### `getWirelessLastStatus()`
```javascript
{ wifi: 1, uap: false, cloud: 4 },
  wlcfg: { sec: 7, ssid: '1234567890796857336364' }
```

<a name="getWeek"></a>
#### `getWeek()`
Disable Monday and start every day at 10:30am
```javascript
{ cycle: [ 'none', 'none', 'none', 'none', 'none', 'none', 'none' ],
  h: [ 17, 10, 10, 12, 10, 13, 17 ],
  m: [ 0, 30, 30, 0, 30, 30, 0 ] }
```

<a name="setWeek"></a>
#### `setWeek(newWeek)`

Disable Sunday and start every day at 10:30am
```javascript
var newWeek = {"cycle":["none","start","start","start","start","start","start"],"h":[10,10,10,10,10,10,10],"m":[30,30,30,30,30,30,30]}
myRobotViaLocal.setWeek(newWeek)
```

Response:

```javascript
{"ok":null}
```

<a name="getCloudConfig"></a>
#### `getCloudConfig()`
```javascript
prod
```

<a name="start"></a>
#### `start()`
```javascript
{"ok":null}
```

<a name="clean"></a>
#### `clean()`
```javascript
{"ok":null}
```

<a name="cleanRoom"></a>
#### `cleanRoom(args)`

`cleanRoom` is an alias for `start` - but with arguments. To clean a room - you need a structure similar to:

```javascript
const args = {
  "pmap_id": "ABCDEFG123456FGKS789",
  "regions": [
    { "region_id": "5", "region_name": "Hallway", "region_type": "hallway", "type": "rid"}
  ],
  "user_pmapv_id": "190917T20125Z"
};

myRobotViaLocal.cleanRoom(args);
```

```javascript
{"ok":null}
```

The easiest way to find this information is to start a clean using the iRobot app and then call the `getRobotState` method and copy the `lastCommand` values from it. Using this you can derive the `pmap_id`, `user_pmapv_id` and `regions` data. Or looking into `pmaps` property in the state.

<a name="cleanRoomMultiple"></a>
#### `cleanRoom(args)` for multiple rooms
By adding more regions to the regions array, a set of rooms will be cleaned.
At least from firmware Version 3.8.3 you can set the desired order, when cleaning multiple rooms by adding `ordered = 1`:

```javascript
const args = {
  "ordered": 1,
  "pmap_id": "ABCDEFG123456FGKS789",
  "regions": [
    { "region_id": "5", "region_name": "Hallway", "region_type": "hallway", "type": "rid"},
    { "region_id": "0", "region_name": "living room", "region_type": "familiy room", "type": "rid"},
    { "region_id": "1", "region_name": "kitchen", "region_type": "kitchen", "type": "rid"}
  ],
  "user_pmapv_id": "190917T20125Z"
};

myRobotViaLocal.cleanRoom(args);
```

```javascript
{"ok":null}
```

<a name="pause"></a>
#### `pause()`
```javascript
{"ok":null}
```

<a name="stop"></a>
#### `stop()`
```javascript
{"ok":null}
```

<a name="resume"></a>
#### `resume()`
```javascript
{"ok":null}
```

<a name="dock"></a>
#### `dock()`
Note: before dock you need to pause() or stop() your robot.
```javascript
{"ok":null}
```

## Simplifications to set Cleaning Preferences:
This methods use setPreferences() with the correct `flags` for each setting.

<a name="setCarpetBoostAuto"></a>
#### `setCarpetBoostAuto()`
```javascript
{"ok":null}
```

<a name="setCarpetBoostPerformance"></a>
#### `setCarpetBoostPerformance()`

<a name="setCarpetBoostEco"></a>
#### `setCarpetBoostEco()`

<a name="setEdgeCleanOn"></a>
#### `setEdgeCleanOn()`

<a name="setEdgeCleanOff"></a>
#### `setEdgeCleanOff()`

<a name="setCleaningPassesAuto"></a>
#### `setCleaningPassesAuto()`

<a name="setCleaningPassesOne"></a>
#### `setCleaningPassesOne()`

<a name="setCleaningPassesTwo"></a>
#### `setCleaningPassesTwo()`

<a name="setAlwaysFinishOn"></a>
#### `setAlwaysFinishOn()`

<a name="setAlwaysFinishOff"></a>
#### `setAlwaysFinishOff()`

<a name="publish"></a>
#### `publish(topic, rawJsonMessageAsString, callback)`

Just to experiment with raw commands using the MQTT client. Known topics are `cmd` and `delta`. But Experiment with other topics and message formats!

The `delta` commands tipicaly have the following json format:
```
{'state': newState}
```

The `cmd` commands tipicaly have the following json format:

```
{'command': command, time: Date.now() / 1000 | 0, initiator: 'localApp'};
```

For example to send a clean command:

```javascript
let myCommand = {command: 'clean', time: Date.now() / 1000 | 0, initiator: 'localApp'};

myRobotViaLocal.publish('cmd', JSON.stringify(myCommand), function(e) {
  if(e) console.log('error', e);
});
```

Dont forget stringify the json message with `JSON.stringify(rawJsonMessageAsString)`.

You can see undocument commands and preferences in [this thread](https://github.com/koalazak/dorita980/issues/39)


## Events

<a name="connect"></a>
#### `connect` event

Emitted on successful Connection.

`function () {}`

Put your code inside this callback.

<a name="close"></a>
#### `close` event

Emitted after a disconnection.

<a name="offline"></a>
#### `offline` event

Emitted when the client goes offline.

<a name="update"></a>
#### `update` event

Emitted every time the Robot publishes a new message to the mqtt bus.

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
<a name="mission"></a>
#### `mission` event

Emitted every `emitIntervalTime` milliseconds with the mission data. (util for mapping in models with position reporting)

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

<a name="state"></a>
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

Not implemented yet in Firmware 2.0.0. [Help wanted!](https://github.com/koalazak/dorita980/issues/25)

## Note for node.js v0.10 users

dorita980 is compatible with node.js > 4.0 But you can use the [getpassword](https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password) feature in node.js < 4.0 using `--harmony` flag like that:

```bash
$ node --harmony ./bin/getpassword.js "192.168.1.104"
```

## Custom tls cipher

You can set `ROBOT_CIPHERS` environment variable to overwrite the cipher suit used in tls connection to the robot. Default is `AES128-SHA256`

```bash
$ ROBOT_CIPHERS=AES128-SHA node myscript.js
```

## Author

- [Facu ZAK](https://github.com/koalazak) 
