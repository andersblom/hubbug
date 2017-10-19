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
        validate:{
            validator: (value) => {
              return validator.isEmail(value);  
            },
            message:'{VALUE} is not a valid Email'
       },
    },
    password: {
        required: "Please enter a password",
        trim: true,
        type: String,
    }
});

userSchema.pre("save", function(next) {
    this.password = md5(this.password);
    next();
})

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);