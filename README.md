# dorita980
Unofficial iRobot Roomba 980 library (SDK).

With this library you can send commands to your Roomba 980 through the iRobot cloud API or directly from your LAN and integrate your roboot with your own Home Automation project.

# Install

```bash
$ npm install dorita980
```

# Quick start via Cloud request
You can control the robot from outside your home

```javascript
var dorita980 = require('dorita980');

var myRobotViaCloud = new dorita980.Cloud('MyUsernameBlid', 'MyPassword'); // No need robot IP

// start to clean!
myRobotViaCloud.start().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});

```

# Quick start via Local request on your LAN
You can control the robot from your local network.

```javascript
var dorita980 = require('dorita980');

var myRobotViaCloud = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address

// start to clean!
myRobotViaLocal.start().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});

```

## Examples

Get robot status via Cloud request:

```javascript
var dorita980 = require('dorita980');

var myRobot = new dorita980.Cloud('MyUsernameBlid', 'MyPassword'); // No need robot IP

myRobotViaCloud.getStatus().then(function(data){
  console.log(data);  
}).catch(function(err){
  console.error(err);
});
```

Dock the robot via Cloud request:

```javascript
var dorita980 = require('dorita980');

var myRobot = new dorita980.Cloud('MyUsernameBlid', 'MyPassword'); // No need robot IP

// go home!
myRobotViaCloud.dock().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});

```

Dock the robot via Local request:

```javascript
var dorita980 = require('dorita980');

var myRobot = new dorita980.Local('MyUsernameBlid', 'MyPassword', '192.168.1.104'); // robot IP address 

// go home!
myRobotViaLocal.dock().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});
```

### Auto discover IP address for local request:

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

# How it works

## Cloud

When you connect your robot to your wifi network, the robot starting to receive remote commands from the iRobot Cloud Service and from the mobile app.
iRobot Cloud Service has a public HTTP API to send commands to your robot if you known your user and password.

## Local

The library send commands direclty over wifi to your robot. You dont need internet connection.

# How to get your username/blid and password
(Needed for Cloud and Local requests)

Download or clone this repo then install, then run `npm run getpassword`. You need to know your robot IP address (look in your router or scan your LAN network with nmap to find it)

```bash
$ git clone https://github.com/koalazak/dorita980.git
$ cd dorita980
$ npm install
$ npm run getpassword
```

Output Example:

```
$ cd dorita980
$ npm install
$ npm run getpassword 192.168.1.103
> node ./bin/getpassword.js "192.168.1.103"

Make sure your robot is on the Home Base and powered on. Then press and hold the HOME button on your robot until it plays a series of tones (about 2 seconds). Release the button and your robot will flash WIFI light. Then wait...
========>
Good job!
Password: xxxxxxxxxxxxx
Username/blid: yyyyyyyyyyyy
Use this credentials in dorita980 lib :)

```

# Local API

## Succesfull response

A successfull response return an object with `ok` property:

```javascript
{ ok: null, id: 2 }
```

## Error response
An error response return an object with `err` property and error number:

```javascript
{ err: -32600 }
```

### Methods

#### `getTime()`
```javascript
{"ok":{"d":"sat","h":13,"m":8},"id":8}
```

#### `setTime({"d":6,"h":13,"m":9})`

```javascript
{"ok":null,"id":23}
```

#### `setPtime({"time":1474128577})`

```javascript
{"ok":null,"id":23}
```

#### `getBbrun()`
```javascript
{"ok":{"hr":103,"min":10,"sqft":251,"nStuck":8,"nScrubs":62,"nPicks":280,"nPanics":97,"nCliffsF":518,"nCliffsR":1005,"nMBStll":0,"nWStll":1,"nCBump":0},"id":9}
```

#### `getLangs()`
```javascript
{ ok: { total: 5, iterIndex: 2, iterName: 'en-US' }, id: 2 }
```

#### `getSys()`
```javascript
{ ok:
   { umi: 2,
     pid: 2,
     blid: 1,2,3,4,5,6,6,8],
     sw: 'v1.2.9',
     cfg: 0,
     boot: 3580,
     main: 4313,
     wifi: 517,
     nav: '01.08.04',
     ui: 2996,
     audio: 31,
     bat: 'lith' },
  id: 2 }
```

#### `getWirelessLastStat()`
```javascript
{ ok: { softap: 0, station: 1, cloud: 3, strssi: 47, diagflags: 0 }, id: 2 }
```

#### `getWeek()`
Monday disable and every day start at 10:30am
```javascript
{ ok:
   { cycle: [ 'start', 'none', 'start', 'start', 'start', 'start', 'start' ],
     h: [ 10, 10, 10, 10, 10, 10, 10 ],
     m: [ 30, 30, 30, 30, 30, 30, 30 ] },
  id: 2 }
```

#### `setWeek(newWeek)`

Disable Sunday and set every day at 10:30am
```javascript
var newWeek = {"cycle":["none","start","start","start","start","start","start"],"h":[10,10,10,10,10,10,10],"m":[30,30,30,30,30,30,30]}
myRobotViaLocal.setWeek(newWeek)
```

Response:

```javascript
{"ok":null,"id":218}
```

#### `getPrefs()`
```javascript
{ ok:
   { flags: 1024,
     lang: 2,
     timezone: 'America/Buenos_Aires',
     name: 'myRobotName' },
  id: 2 }
```

#### `setPreferences(newPreferences)`

```javascript
var newPreferences = { 
  flags: 1107, // See Cleaning Preferences table. (im working on a bit mask to simplify this)
  lang: 2,
  timezone: 'America/Buenos_Aires',
  name: 'myRobotName'
};

myRobotViaLocal.setPreferences(newPreferences)
```

Response:

```javascript
{"ok":null,"id":293}
```


#### `getMission()`
With this you can draw a map :)

```javascript
{ ok:
   { flags: 0,
     cycle: 'none',
     phase: 'charge',
     pos: { theta: 179, point: {x: 102, y: -13} },
     batPct: 99,
     expireM: 0,
     rechrgM: 0,
     error: 0,
     notReady: 0,
     mssnM: 0,
     sqft: 0 },
  id: 2 }
```

#### `getWirelessStatus()`
```javascript
{ ok:
   { softap: 0,
     station: 1,
     strssi: 45,
     dhcp: 1,
     addr: 1744939200,
     mask: 16777215,
     gtwy: 16885952,
     dns1: 16885952,
     dns2: 0,
     bssid: [ 123, 23, 23, 123, 23, 123 ],
     sec: 4 },
  id: 2 }
```

#### `getCloudConfig()`
```javascript
{ ok: { cloudconfig: 'https://irobot-connect.axeda.com/ammp/' },
  id: 2 }
```

#### `start()`
```javascript
{"ok":null,"id":293}
```

#### `pause()`
```javascript
{"ok":null,"id":293}
```

#### `stop()`
```javascript
{"ok":null,"id":293}
```

#### `resume()`
```javascript
{"ok":null,"id":293}
```

#### `dock()`
```javascript
{"ok":null,"id":293}
```

## Cleaning Preferences Flags table

| Carpet Boost | Cleaning Passes | Finish Cleaning when bin is full | Edge Clean | Flags DEC | 
|--------------|-----------------|----------------------------------|------------|-----------| 
| auto         | one             | on                               | on         | 1024      | 
| auto         | one             | on                               | off        | 1026      | 
| auto         | one             | off                              | on         | 1056      | 
| auto         | one             | off                              | off        | 1058      | 
| auto         | two             | on                               | on         | 1025      | 
| auto         | two             | on                               | off        | 1027      | 
| auto         | two             | off                              | on         | 1057      | 
| auto         | two             | off                              | off        | 1059      | 
| Performance  | one             | on                               | on         | 1104      | 
| Performance  | one             | on                               | off        | 1106      | 
| Performance  | one             | off                              | on         | 1136      | 
| Performance  | one             | off                              | off        | 1138      | 
| Performance  | two             | on                               | on         | 1105      | 
| Performance  | two             | on                               | off        | 1107      | 
| Performance  | two             | off                              | on         | 1137      | 
| Performance  | two             | off                              | off        | 1139      | 
| Eco          | one             | on                               | on         | 1040      | 
| Eco          | one             | on                               | off        | 1042      | 
| Eco          | one             | off                              | on         | 1072      | 
| Eco          | one             | off                              | off        | 1074      | 
| Eco          | two             | on                               | on         | 1041      | 
| Eco          | two             | on                               | off        | 1043      | 
| Eco          | two             | off                              | on         | 1073      | 
| Eco          | two             | off                              | off        | 1075      | 



# Cloud API

*(Full Documentation pending...)*

- `myRobotViaCloud.getStatus()`
- `myRobotViaCloud.accumulatedHistorical()`
- `myRobotViaCloud.missionHistory()`
- `myRobotViaCloud.clean()`
- `myRobotViaCloud.quick()`
- `myRobotViaCloud.spot()`
- `myRobotViaCloud.dock()`
- `myRobotViaCloud.start()`
- `myRobotViaCloud.pause()`
- `myRobotViaCloud.resume()`
- `myRobotViaCloud.stop()`
- `myRobotViaCloud.wake()`
- `myRobotViaCloud.reset()`
- `myRobotViaCloud.find()`
- `myRobotViaCloud.wipe()` (untested)
- `myRobotViaCloud.patch()` (untested)
- `myRobotViaCloud.dlpkg()` (untested)
- `myRobotViaCloud.rechrg()` (untested)
- `myRobotViaCloud.wlapon()` (untested)
- `myRobotViaCloud.wlapoff()` (untested)
- `myRobotViaCloud.wlston()` (untested)
- `myRobotViaCloud.wlstoff()` (untested)
- `myRobotViaCloud.wifiscan()` (untested)
- `myRobotViaCloud.ipdone()` (untested)
- `myRobotViaCloud.provdone()` (untested)
- `myRobotViaCloud.bye()` (untested)
- `myRobotViaCloud.wllogflush()` (untested)
- `myRobotViaCloud.sleep()`
- `myRobotViaCloud.off()`
- `myRobotViaCloud.fbeep()`

## TODO

- Bit mask to set Cleaning Preferences more easly (without using flags).

## Author

- [Facu ZAK](https://github.com/koalazak) 
