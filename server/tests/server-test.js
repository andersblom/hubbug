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
    
    beforeEach(function(done) {
        const newUser = new User({
            email: "testuser@example.com",
            password: "testing"
        });
        newUser.save(function(err) {
            if (err) err => console.log(err);
            done();
        });
    });

    afterEach(function(done){
        User.collection.drop();
        done();
    })

    it("should create user on POST /user/create", done => {
        const userInfo = {
            email: "testuser@example.com",
            password: md5("testing")
        };

        chai.request(server)
        .post('/user/create')
        .send(userInfo)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.success.should.have.property("newUser");
            res.body.success.newUser.should.have.property("email");
            res.body.success.newUser.should.have.property("password");
            res.body.success.newUser.should.have.property("_id");
            res.body.success.newUser.email.should.be.equal("testuser@example.com");
            res.body.success.newUser.password.should.be.equal(md5("testing"));
        });
        
        done();
    });
})