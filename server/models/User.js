const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "Please provide us with an email.",
        trim: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: (value) => {
              return validator.isEmail(value);  
            },
            message:'{VALUE} is not a valid Email'
       },
    },
    name: {
        type: String,
        required: "Please provide us with a name"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);