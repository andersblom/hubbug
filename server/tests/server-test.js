process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../app');
var User = mongoose.model("User");
const md5 = require("md5");

chai.use(chaiHttp);
const should = chai.should();

describe("Users", () => {
    beforeEach(function (done) {
		const user = new User({
			email: 'testuser@example.com',
			password: 'testing'
		});
		user.save(function (err) {
			done();
		});
	});

    afterEach(function(done){
        User.collection.drop();
        done();
    })

    // POST /user/create
    it("should create user on POST /user/create", done => {
        chai.request(server)
        .post('/user/create')
        .send({
            email: "anders@andersblom.dk",
            password: "testing"
        })
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.message.should.be.equal("success");
            res.body.result.should.be.a("object");
            res.body.result.should.have.property("_id");
            res.body.result.should.have.property("email");
            res.body.result.should.have.property("password");
            res.body.result.should.have.property("createdAt");
            res.body.result.email.should.be.equal("anders@andersblom.dk");
            done();
        });
    });

    // POST /user
    it("should return success on log in", done => {
        chai.request(server)
        .post('/user')
        .send({
            email: "testuser@example.com",
            password: "testing"
        })
        .end((err, res) => {
            res.statusCode.should.be.equal(200);
            res.body.should.be.a("object");
            res.body.message.should.equal("success");
            res.body.result.should.be.a("object");
            res.body.result.should.have.property("_id");
            res.body.result.should.have.property("email");
            res.body.result.should.have.property("password");
            res.body.result.should.have.property("createdAt");
            res.body.result.email.should.be.equal("testuser@example.com");
            done();
        });
    });

    it("should create a Bug-Reporter instance");
    it("should find a users Bug-Reporter instances");
    it("should be able to edit a Bug-Reporter info");
});

describe("Bug reports", () => {
    it("should be able to report a bug");
    it("should be able to connect to GitHub");
    it("should be able to post to GitHub");
})