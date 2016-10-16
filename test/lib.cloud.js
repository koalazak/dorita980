/* global it describe */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

var mockRequest = function (options) {
  expect(options.method).to.be.equal('GET');
  expect(options).to.have.property('headers');
  expect(options.headers['User-Agent']).to.be.equal('aspen%20production/2618 CFNetwork/758.3.15 Darwin/15.4.0');
  expect(options.headers['Accept']).to.be.equal('*/*');
  expect(options.headers['ASSET-ID'].split('!')[0]).to.be.equal('ElPaso@irobot');

  if (options.headers['ASSET-ID'] === 'ElPaso@irobot!myuser_badjson') {
    return Promise.resolve('bad json');
  }
  return Promise.resolve(JSON.stringify({uri: options.uri}));
};

const Dorita980Cloud = proxyquire('../lib/cloud.js', {
  'request-promise': mockRequest
});

function generateUri (one, two) {
  if (two) one = 'multipleFieldSet&value=%7B%0A%20%20%22remoteCommand%22%20:%20%22' + two + '%22%0A%7D';
  return {'uri': 'https://irobot.axeda.com/services/v1/rest/Scripto/execute/AspenApiRequest?blid=myuser&robotpwd=mypass&method=' + one};
}
describe('dorita980 cloud instance', () => {
  it('should require user/blid', () => {
    expect(function () {
      let viaCloud = new Dorita980Cloud();
      expect(viaCloud).to.be.instanceof(Object);
    }).to.throw(/robotID is required./);
  });

  it('should require password', () => {
    expect(function () {
      let viaCloud = new Dorita980Cloud('myuser');
      expect(viaCloud).to.be.instanceof(Object);
    }).to.throw(/password is required./);
  });

  it('should return an object', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    expect(viaCloud).to.be.instanceof(Object);
  });
});

describe('dorita980 cloud call', () => {
  it('should be rejected if get an invalid json response', () => {
    let viaCloud = new Dorita980Cloud('myuser_badjson', 'mypass');

    return expect(viaCloud.getStatus()).be.rejectedWith('Unexpected token b');
  });

  it('should send getStatus command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.getStatus()).eventually.deep.equal(generateUri('getStatus'));
  });

  it('should send accumulatedHistorical command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.accumulatedHistorical()).eventually.deep.equal(generateUri('accumulatedHistorical'));
  });

  it('should send missionHistory command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.missionHistory()).eventually.deep.equal(generateUri('missionHistory'));
  });

  it('should send clean command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.clean()).eventually.deep.equal(generateUri('multipleFieldSet', 'clean'));
  });

  it('should send quick command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.quick()).eventually.deep.equal(generateUri('multipleFieldSet', 'quick'));
  });

  it('should send spot command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.spot()).eventually.deep.equal(generateUri('multipleFieldSet', 'spot'));
  });

  it('should send dock command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.dock()).eventually.deep.equal(generateUri('multipleFieldSet', 'dock'));
  });

  it('should send start command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.start()).eventually.deep.equal(generateUri('multipleFieldSet', 'start'));
  });

  it('should send pause command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.pause()).eventually.deep.equal(generateUri('multipleFieldSet', 'pause'));
  });

  it('should send resume command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.resume()).eventually.deep.equal(generateUri('multipleFieldSet', 'resume'));
  });

  it('should send stop command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.stop()).eventually.deep.equal(generateUri('multipleFieldSet', 'stop'));
  });

  it('should send wake command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wake()).eventually.deep.equal(generateUri('multipleFieldSet', 'wake'));
  });

  it('should send reset command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.reset()).eventually.deep.equal(generateUri('multipleFieldSet', 'reset'));
  });

  it('should send find command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.find()).eventually.deep.equal(generateUri('multipleFieldSet', 'find'));
  });

  it('should send wipe command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wipe()).eventually.deep.equal(generateUri('multipleFieldSet', 'wipe'));
  });

  it('should send patch command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.patch()).eventually.deep.equal(generateUri('multipleFieldSet', 'patch'));
  });

  it('should send dlpkg command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.dlpkg()).eventually.deep.equal(generateUri('multipleFieldSet', 'dlpkg'));
  });

  it('should send rechrg command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.rechrg()).eventually.deep.equal(generateUri('multipleFieldSet', 'rechrg'));
  });

  it('should send wlapon command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wlapon()).eventually.deep.equal(generateUri('multipleFieldSet', 'wlapon'));
  });

  it('should send wlapoff command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wlapoff()).eventually.deep.equal(generateUri('multipleFieldSet', 'wlapoff'));
  });

  it('should send wlston command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wlston()).eventually.deep.equal(generateUri('multipleFieldSet', 'wlston'));
  });

  it('should send wlstoff command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wlstoff()).eventually.deep.equal(generateUri('multipleFieldSet', 'wlstoff'));
  });

  it('should send wifiscan command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wifiscan()).eventually.deep.equal(generateUri('multipleFieldSet', 'wifiscan'));
  });

  it('should send ipdone command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.ipdone()).eventually.deep.equal(generateUri('multipleFieldSet', 'ipdone'));
  });

  it('should send provdone command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.provdone()).eventually.deep.equal(generateUri('multipleFieldSet', 'provdone'));
  });

  it('should send bye command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.bye()).eventually.deep.equal(generateUri('multipleFieldSet', 'bye'));
  });

  it('should send wllogflush command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.wllogflush()).eventually.deep.equal(generateUri('multipleFieldSet', 'wllogflush'));
  });

  it('should send sleep command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.sleep()).eventually.deep.equal(generateUri('multipleFieldSet', 'sleep'));
  });

  it('should send off command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.off()).eventually.deep.equal(generateUri('multipleFieldSet', 'off'));
  });

  it('should send fbeep command', () => {
    let viaCloud = new Dorita980Cloud('myuser', 'mypass');
    return expect(viaCloud.fbeep()).eventually.deep.equal(generateUri('multipleFieldSet', 'fbeep'));
  });
});
