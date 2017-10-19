const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../app');

// const Modelname = require('../models/Modelname');
chai.use(chaiHttp);
const should = chai.should();

describe("Server testing", () => {
    it("should run a test", done => {
        const trueVar = true;
        trueVar.should.equal(true);
        done();
    })
})