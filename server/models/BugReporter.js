const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const bugReporterSchema = new mongoose.Schema({
    appName: {
        type: String,
        required: "Please enter a name for your app / website!",
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: String,
        required: "No owner was assigned",
        trim: true,
    },
    authToken: {
        type: String,
        required: "We need to be able to authenticate to GitHub!",
    }
});

bugReporterSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("BugReporter", bugReporterSchema);