# dorita980
unofficial iRobot Roomba 980 library / SDK

With this library you can send commands to your Roomba 980 through the iRobot cloud API.

# Install

```bash
$ npm install dorita980
```

# Quick start

```javascript
var Dorita980 = require('dorita980');

var myRobot = new Dorita980('robotID', 'password');

myRobot.start().then((response) => {
  console.log(response);
}).catch((err) => {
  conole.log(err);
});

```

Get robot status example:

```javascript
var Dorita980 = require('dorita980');

var myRobot = new Dorita980('robotID', 'password');

myRobot.getStatus().then(function(data){
  console.log(data);  
}).catch(function(err){
  console.error(err);
});
```

# How it works

TODO

# Find your password

TODO

# API

- `myRobot.getStatus()`
- `myRobot.accumulatedHistorical()`
- `myRobot.missionHistory()`
- `myRobot.clean()`
- `myRobot.quick()`
- `myrobot.spot()`
- `myrobot.dock()`
- `myrobot.start()`
- `myrobot.pause()`
- `myrobot.resume()`
- `myrobot.stop()`
- `myrobot.wake()`
- `myrobot.reset()`
- `myrobot.find()`
- `myrobot.wipe()`
- `myrobot.patch()`
- `myrobot.dlpkg()`
- `myrobot.rechrg()`
- `myrobot.wlapon()`
- `myrobot.wlapoff()`
- `myrobot.wlston()`
- `myrobot.wlstoff()`
- `myrobot.wifiscan()`
- `myrobot.ipdone()`
- `myrobot.provdone()`
- `myrobot.bye()`
- `myrobot.wllogflush()`
- `myrobot.sleep6()`
- `myrobot.off6()`
- `myrobot.fbeep6()`


