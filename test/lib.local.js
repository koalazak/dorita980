/* global it describe */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

var mockRequest = function (options) {
  expect(options.method).to.be.equal('POST');
  expect(options).to.have.property('headers');
  expect(options.headers['User-Agent']).to.be.equal('aspen%20production/2618 CFNetwork/758.3.15 Darwin/15.4.0');
  expect(options.headers['Accept']).to.be.equal('*/*');
  expect(options.headers['Content-Type']).to.be.equal('application/json');
  expect(options.uri).to.be.equal('https://192.168.1.104:443/umi');
  expect(options.headers).to.have.property('Authorization');

  switch (options.headers['Authorization'].split(' ')[1]) {
    case new Buffer('user:123456_bad').toString('base64'):
      return Promise.resolve('bad json');
    case new Buffer('user:123456_getprefs_err').toString('base64'):
      return Promise.resolve(JSON.stringify({'error': -12345, 'body': options.body}));
    case new Buffer('user:123456_getprefs').toString('base64'):
      if (JSON.parse(options.body).do === 'get') {
        let resp = {
          ok: {
            flags: 1024,
            lang: 2,
            timezone: 'America/Buenos_Aires',
            name: 'myRobotName'
          },
          id: 2,
          body: options.body
        };
        return Promise.resolve(JSON.stringify(resp));
      } else {
        return Promise.resolve(JSON.stringify({'ok': null, 'body': options.body}));
      }
    default:
      expect(options.headers['Authorization']).to.be.equal('Basic ' + new Buffer('user:mypassword').toString('base64'));
      return Promise.resolve(JSON.stringify({'ok': null, 'body': options.body}));
  }
};

const Dorita980Local = proxyquire('../lib/local.js', {
  'request-promise': mockRequest
});

function generateBody (method, command, args, rid) {
  rid = rid || 1;
  return '{"do":"' + method + '","args":["' + command + '"' + (args ? ', ' + JSON.stringify(args) : '') + '],"id":' + rid + '}';
}

describe('dorita980 local instance', () => {
  it('should require user/blid', () => {
    expect(function () {
      let viaLocal = new Dorita980Local();
      expect(viaLocal).to.be.instanceof(Object);
    }).to.throw(/robotID is required./);
  });

  it('should require password', () => {
    expect(function () {
      let viaLocal = new Dorita980Local('myblid123');
      expect(viaLocal).to.be.instanceof(Object);
    }).to.throw(/password is required./);
  });

  it('should require host', () => {
    expect(function () {
      let viaLocal = new Dorita980Local('myuser', 'mypassword');
      expect(viaLocal).to.be.instanceof(Object);
    }).to.throw(/host is required./);
  });

  it('should return an object', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    expect(viaLocal).to.be.instanceof(Object);
  });
});

describe('dorita980 Cleaning Preferences helpers', () => {
  it('should return decoded Cleaning Preferences for 1024 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1024);
    expect(preferences.carpetBoost).be.equal('auto');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal('1');
    expect(preferences.alwaysFinish).be.equal(true);
  });

  it('should return decoded Cleaning Preferences for 1058 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1058);
    expect(preferences.carpetBoost).be.equal('auto');
    expect(preferences.edgeClean).be.equal(false);
    expect(preferences.cleaningPasses).be.equal('1');
    expect(preferences.alwaysFinish).be.equal(false);
  });

  it('should return decoded Cleaning Preferences for 1105 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1105);
    expect(preferences.carpetBoost).be.equal('performance');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal('2');
    expect(preferences.alwaysFinish).be.equal(true);
  });

  it('should return decoded Cleaning Preferences for 1072 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1072);
    expect(preferences.carpetBoost).be.equal('eco');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal('1');
    expect(preferences.alwaysFinish).be.equal(false);
  });

  it('should return decoded Cleaning Preferences for 18 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(18);
    expect(preferences.carpetBoost).be.equal('eco');
    expect(preferences.edgeClean).be.equal(false);
    expect(preferences.cleaningPasses).be.equal('auto');
    expect(preferences.alwaysFinish).be.equal(true);
  });

  it('should return decoded Cleaning Preferences for 112 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(112);
    expect(preferences.carpetBoost).be.equal('performance');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal('auto');
    expect(preferences.alwaysFinish).be.equal(false);
  });
});

describe('dorita980 local call', () => {
  it('should be rejected if get an invalid json response', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_bad', '192.168.1.104');

    return expect(viaLocal.getTime()).be.rejectedWith('Unexpected token b');
  });

  it('should send getPreferences command with default decoded arg', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let responseOK = {
      ok: {
        'cleaningPreferences': {
          'alwaysFinish': true,
          'carpetBoost': 'auto',
          'cleaningPasses': '1',
          'edgeClean': true
        },
        'flags': 1024,
        'lang': 2,
        'name': 'myRobotName',
        'timezone': 'America/Buenos_Aires'
      },
      id: 2,
      'body': generateBody('get', 'prefs')
    };

    return expect(viaLocal.getPreferences()).eventually.deep.equal(responseOK);
  });

  it('should send getPreferences command with default decoded arg and handle not ok response', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs_err', '192.168.1.104');

    let responseOK = {
      'error': -12345,
      'body': generateBody('get', 'prefs')
    };

    return expect(viaLocal.getPreferences()).eventually.deep.equal(responseOK);
  });

  it('should send getPreferences command with false decoded arg', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let responseOK = {
      ok: {
        'flags': 1024,
        'lang': 2,
        'name': 'myRobotName',
        'timezone': 'America/Buenos_Aires'
      },
      id: 2,
      'body': generateBody('get', 'prefs')
    };

    return expect(viaLocal.getPreferences(false)).eventually.deep.equal(responseOK);
  });

  it('should send setPreferences command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferences = {
      flags: 1107,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferences)
    };

    return expect(viaLocal.setPreferences(newPreferences)).eventually.deep.equal(responseOK);
  });

  it('should send setCarpetBoostPerformance command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1104,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCarpetBoostPerformance()).eventually.deep.equal(responseOK);
  });

  it('should send setCarpetBoostEco command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1040,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCarpetBoostEco()).eventually.deep.equal(responseOK);
  });

  it('should send setCarpetBoostAuto command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1024,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCarpetBoostAuto()).eventually.deep.equal(responseOK);
  });

  it('should send setEdgeCleanOn command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1024,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setEdgeCleanOn()).eventually.deep.equal(responseOK);
  });

  it('should send setEdgeCleanOff command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1026,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setEdgeCleanOff()).eventually.deep.equal(responseOK);
  });

  it('should send setCleaningPassesAuto command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 0,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCleaningPassesAuto()).eventually.deep.equal(responseOK);
  });

  it('should send setCleaningPassesOne command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1024,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCleaningPassesOne()).eventually.deep.equal(responseOK);
  });

  it('should send setCleaningPassesTwo command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1025,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setCleaningPassesTwo()).eventually.deep.equal(responseOK);
  });

  it('should send setAlwaysFinishOn command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1024,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setAlwaysFinishOn()).eventually.deep.equal(responseOK);
  });

  it('should send setAlwaysFinishOff command', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_getprefs', '192.168.1.104');

    let newPreferencesWillbe = {
      flags: 1056,
      lang: 2,
      timezone: 'America/Buenos_Aires',
      name: 'myRobotName'
    };

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'prefs', newPreferencesWillbe, 2)
    };

    return expect(viaLocal.setAlwaysFinishOff()).eventually.deep.equal(responseOK);
  });

  it('should send getBbrun command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'bbrun')
    };

    return expect(viaLocal.getBbrun()).eventually.deep.equal(responseOK);
  });

  it('should send getSKU command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'sku')
    };

    return expect(viaLocal.getSKU()).eventually.deep.equal(responseOK);
  });

  it('should send getMission command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'mssn')
    };

    return expect(viaLocal.getMission()).eventually.deep.equal(responseOK);
  });

  it('should send getWirelessConfig command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'wlcfg')
    };

    return expect(viaLocal.getWirelessConfig()).eventually.deep.equal(responseOK);
  });

  it('should send getWirelessStatus command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'wlstat')
    };

    return expect(viaLocal.getWirelessStatus()).eventually.deep.equal(responseOK);
  });

  it('should send getCloudConfig command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'cloudcfg')
    };

    return expect(viaLocal.getCloudConfig()).eventually.deep.equal(responseOK);
  });

  it('should send getWeek command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'week')
    };

    return expect(viaLocal.getWeek()).eventually.deep.equal(responseOK);
  });

  it('should send getLangs command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'langs')
    };

    return expect(viaLocal.getLangs()).eventually.deep.equal(responseOK);
  });

  it('should send getSys command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'sys')
    };

    return expect(viaLocal.getSys()).eventually.deep.equal(responseOK);
  });

  it('should send getWirelessLastStatus command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('get', 'wllaststat')
    };

    return expect(viaLocal.getWirelessLastStatus()).eventually.deep.equal(responseOK);
  });

  it('should send start command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'cmd', {'op': 'start'})
    };

    return expect(viaLocal.start()).eventually.deep.equal(responseOK);
  });

  it('should send pause command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'cmd', {'op': 'pause'})
    };

    return expect(viaLocal.pause()).eventually.deep.equal(responseOK);
  });

  it('should send stop command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'cmd', {'op': 'stop'})
    };

    return expect(viaLocal.stop()).eventually.deep.equal(responseOK);
  });

  it('should send resume command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'cmd', {'op': 'resume'})
    };

    return expect(viaLocal.resume()).eventually.deep.equal(responseOK);
  });

  it('should send dock command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: null,
      'body': generateBody('set', 'cmd', {'op': 'dock'})
    };

    return expect(viaLocal.dock()).eventually.deep.equal(responseOK);
  });

  it('should send setWeek command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    var newWeek = {'cycle': ['none', 'start', 'start', 'start', 'start', 'start', 'start'], 'h': [10, 10, 10, 10, 10, 10, 10], 'm': [30, 30, 30, 30, 30, 30, 30]};
    let responseOK = {
      ok: null,
      'body': generateBody('set', 'week', newWeek)
    };

    return expect(viaLocal.setWeek(newWeek)).eventually.deep.equal(responseOK);
  });

  it('should send setTime command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    var newTime = {'d': 6, 'h': 13, 'm': 9};
    let responseOK = {
      ok: null,
      'body': generateBody('set', 'time', newTime)
    };

    return expect(viaLocal.setTime(newTime)).eventually.deep.equal(responseOK);
  });

  it('should send setPtime command', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    var newTime = {'time': 1474128577};
    let responseOK = {
      ok: null,
      'body': generateBody('set', 'ptime', newTime)
    };

    return expect(viaLocal.setPtime(newTime)).eventually.deep.equal(responseOK);
  });
});
