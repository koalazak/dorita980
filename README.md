# dorita980
Unofficial iRobot Roomba 980 library (SDK).

With this library you can send commands to your Roomba 980 through the iRobot cloud API and integrate with your own `Home automation` project.

# Install

```bash
$ npm install dorita980
```

# Quick start

```javascript
var dorita980 = require('dorita980');

var myRobotViaCloud = new dorita980.Cloud('MyUsernameBlid', 'MyPassword');

// start to clean!
myRobotViaCloud.start().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});

```

Get robot status example:

```javascript
var dorita980 = require('dorita980');

var myRobot = new dorita980.Cloud('MyUsernameBlid', 'MyPassword');

myRobotViaCloud.getStatus().then(function(data){
  console.log(data);  
}).catch(function(err){
  console.error(err);
});
```

Dock the robot:

```javascript
var dorita980 = require('dorita980');

var myRobot = new dorita980.Cloud('MyUsernameBlid', 'MyPassword');

// go home!
myRobotViaCloud.dock().then((response) => {
  console.log(response);
}).catch((err) => {
  console.log(err);
});

```

# How it works

When you connect your roomba to your wifi network, the robot starting to receive remote commands from the iRobot Cloud Service and from the mobile app.
iRobot Cloud Service has a public HTTP API to send commands to your robot if you known your user and password.


# How to get your username/blid and password
Download or clone this repo then install, then run `npm run getpassword`. You need to know your Roomba IP address (look in your router or scan your LAN network with nmap to find it)

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

Make sure your Roomba is on the Home Base and powered on. Then press and hold the HOME button on your roomba until it plays a series of tones (about 2 seconds). Release the button and your Roomba will flash WIFI light. Then wait...
========>
Good job!
Password: xxxxxxxxxxxxx
Username/blid: yyyyyyyyyyyy
Use this credentials in dorita980 lib :)

```

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

## Author

- [Facu ZAK](https://github.com/koalazak) 
