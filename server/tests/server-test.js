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
    User.collection.drop();
    
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

    it("should create user on POST /user/create", done => {
        chai.request(server)
        .post('/user/create')
        .send({
            email: "anders@andersblom.dk",
            password: "testing"
        })
        .end((err, res) => {
            console.log(res.body);
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

    it("should return success on log in", done => {
        const user = new User({
			email: 'samantha@example.com',
			password: 'testing'
		});
		user.save(function (err) {
            chai.request(server)
            .post('/user')
            .send({
                email: "samantha@example.com",
                password: "testing"
            })
            .end((err, res) => {
                console.log("YES:", res.body)
                res.statusCode.should.be.equal(200);
                res.body.should.be.a("object");
                done();
            });
        });
    })
})