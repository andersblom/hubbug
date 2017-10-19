const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const md5 = require('md5'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "Please provide us with an email.",
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        required: "Please enter a password",
        trim: true,
        type: String,
    }
});

userSchema.pre("save", function(req, res, next) {
    console.log(req);
    // req.body = md5(req.body);
    next();
})

userSchema.plugin(mongodbErrorHandler);