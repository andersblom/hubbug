const BugReporter = require('../models/BugReporter');

exports.createReporter = async (req, res) => {
    try {
        const bugreporter = await new BugReporter(req.body);
        await bugreporter.save(err => {
            if (err) {
                throw new Error(err);
            }
        });
        res.status(201);
        res.json({
            message: "success",
            result: bugreporter
        });

    } catch(err) {
        next(err);
    }
}

exports.viewAllReporters = async (req, res) => {
    try {
        const reporters = await BugReporter.find({
            owner: req.body.userId
        });
        
        if (!reporters) {
            res.status(204);
            res.json({
                message: "No reporters was found for user",
                result: reporters
            })
        }
        
        res.status(200);
        res.json({
            message: "success",
            result: reporters,
        });

    } catch(err) {
        next(err);
    }
}

exports.viewSingleReporter = async (req, res) => {
    try {
        const reporter = await BugReporter.findOne({
            _id: req.body.reporterId
        });
        
        if (!reporter) {
            res.status(204);
            res.json({
                message: "No reporter was found for this ID",
                result: reporter
            })
        }
        
        res.status(200);
        res.json({
            message: "success",
            result: reporter,
        });

    } catch(err) {
        next(err);
    }
}

exports.updateReporter = (req, res) => {

}

// router.put('/bugreporter/:id', reporterController.updateReporter);