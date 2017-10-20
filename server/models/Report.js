const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Please enter a title",
        trim: true,
    },
    description: String,
    stepsToReproduce: String,
    contactEmail: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

reportSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Report", reportSchema);