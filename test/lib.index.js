/* global it describe */
'use strict';

const chai = require('chai');
const expect = chai.expect;
const dorita980 = require('../index');

describe('dorita980 require', () => {
  it('should return an object with functions', () => {
    expect(dorita980).to.be.instanceof(Object);
    expect(dorita980).to.have.property('Cloud');
    expect(dorita980).to.have.property('Local');
    expect(dorita980).to.have.property('getRobotIP');
    expect(dorita980.Cloud).to.be.instanceof(Function);
    expect(dorita980.Local).to.be.instanceof(Function);
    expect(dorita980.getRobotIP).to.be.instanceof(Function);
  });
});
