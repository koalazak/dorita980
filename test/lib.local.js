/* global it describe*/
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

  if (options.headers['Authorization'] === 'Basic ' + new Buffer('user:123456_bad').toString('base64')) {
    return Promise.resolve('bad json');
  } else {
    expect(options.headers['Authorization']).to.be.equal('Basic ' + new Buffer('user:mypassword').toString('base64'));
  }
  return Promise.resolve(JSON.stringify({'ok': {flags: 1024}, 'body':options.body}));
};

const Dorita980Local = proxyquire('../lib/local.js', {
  'request-promise': mockRequest
});

function generateBody(method, command, args, rid) {
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
    expect(preferences.cleaningPasses).be.equal(1);
    expect(preferences.alwaysFinish).be.equal(true);
  });

   it('should return decoded Cleaning Preferences for 1058 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1058);
    expect(preferences.carpetBoost).be.equal('auto');
    expect(preferences.edgeClean).be.equal(false);
    expect(preferences.cleaningPasses).be.equal(1);
    expect(preferences.alwaysFinish).be.equal(false);
  });

  it('should return decoded Cleaning Preferences for 1105 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1105);
    expect(preferences.carpetBoost).be.equal('performance');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal(2);
    expect(preferences.alwaysFinish).be.equal(true);
  });

  it('should return decoded Cleaning Preferences for 1072 flag', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');
    let preferences = viaLocal.decodeCleaningPreferences(1072);
    expect(preferences.carpetBoost).be.equal('eco');
    expect(preferences.edgeClean).be.equal(true);
    expect(preferences.cleaningPasses).be.equal(1);
    expect(preferences.alwaysFinish).be.equal(false);
  });
});

describe('dorita980 local call', () => {
  it('should be rejected if get an invalid json response', () => {
    let viaLocal = new Dorita980Local('myuser', '123456_bad', '192.168.1.104');

    return expect(viaLocal.getTime()).be.rejectedWith('SyntaxError: Unexpected token b');
  });

  it('should send getPreferences command with default decoded arg', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: {
        'cleaningPreferences': {
          'alwaysFinish': true,
          'carpetBoost': 'auto',
          'cleaningPasses': 1,
          'edgeClean': true
        },
        'flags' :1024
      }, 
      'body': generateBody('get', 'prefs')
    };

   
    return expect(viaLocal.getPreferences()).eventually.deep.equal(responseOK);
  });

  it('should send getPreferences command with false decoded arg', () => {
    let viaLocal = new Dorita980Local('myuser', 'mypassword', '192.168.1.104');

    let responseOK = {
      ok: {
        'flags' :1024
      }, 
      'body': generateBody('get', 'prefs')
    };

   
    return expect(viaLocal.getPreferences(false)).eventually.deep.equal(responseOK);
  });
});
