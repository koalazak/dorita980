# dorita980
Unofficial iRobot Roomba 980 library (SDK).

With this library you can send commands to your Roomba 980 through the iRobot cloud API and integrate with your own `Home automation` project.

# Install

```bash
$ npm install dorita980
```

# Quick start

```javascript
var Dorita980 = require('dorita980');

var myRobot = new Dorita980('robotID', 'password');

// start to clean!
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

Dock the robot:

```javascript
var Dorita980 = require('dorita980');

var myRobot = new Dorita980('robotID', 'password');

// go home!
myRobot.dock().then((response) => {
  console.log(response);
}).catch((err) => {
  conole.log(err);
});

```

# How it works

When you connect your roomba to your wifi network, the robot starting to receive remote commands from the iRobot Cloud Service and from the mobile app.
iRobot Cloud Service has a public HTTP API to send commands to your robot if you known your user and password.


# How to find your user/password

With a clasical MITM atack with ssl split!
You need:

- Roomba 980 configured and connected to internet
- Computer
- Charles Proxy installed in your pc/mac https://www.charlesproxy.com/
- A phone with the iRobot app

1. Install and run Charles Proxy in your pc/mac. Enable ssl proxy on port 8888.

2. Configure your mobile to use HTTP Proxy ([iphone instructions here](https://www.charlesproxy.com/documentation/faqs/using-charles-from-an-iphone/) and [andriod instructions here](http://www.phonearena.com/news/How-to-set-up-a-proxy-server-connection-in-Android_id70310)) using the IP of your computer and port 8888.

3. Install CA cert visiting http://charlesproxy.com/getssl from your phone.

4. Open iRobot app on your phone.

5. Now on Charles, accept the incomming connection from your phone, then you can see all the trafic between the app and the Cloud.

6. Find a request to `irobot.axeda.com` with the values `blid=`(user) and `robotpwd=`(password)

7. Copy that and use in this lib ;)

# API

*(Full Documentation pending...)*

- `myRobot.getStatus()`
- `myRobot.accumulatedHistorical()`
- `myRobot.missionHistory()`
- `myRobot.clean()`
- `myRobot.quick()`
- `myRobot.spot()`
- `myRobot.dock()`
- `myRobot.start()`
- `myRobot.pause()`
- `myRobot.resume()`
- `myRobot.stop()`
- `myRobot.wake()`
- `myRobot.reset()`
- `myRobot.find()`
- `myRobot.wipe()` (untested)
- `myRobot.patch()` (untested)
- `myRobot.dlpkg()` (untested)
- `myRobot.rechrg()` (untested)
- `myRobot.wlapon()` (untested)
- `myRobot.wlapoff()` (untested)
- `myRobot.wlston()` (untested)
- `myRobot.wlstoff()` (untested)
- `myRobot.wifiscan()` (untested)
- `myRobot.ipdone()` (untested)
- `myRobot.provdone()` (untested)
- `myRobot.bye()` (untested)
- `myRobot.wllogflush()` (untested)
- `myRobot.sleep()`
- `myRobot.off()`
- `myRobot.fbeep()`

# Collaborate!

We need:

1. A way (algorithm) to obtain the `robotID` from the Serial Number or something.
2. A way (algorithm) to obtain the `password` without MITM atack. (maybe derivative from wifi Access Point name/password or Serial Number?)
3. Research to handle all the API commands

