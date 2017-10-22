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

exports.viewSingleReporter = (req, res) => {

}

exports.updateReporter = (req, res) => {

}

// router.post('/bugreporter/create', reporterController.createReporter);
// router.get('/bugreporter', reporterController.viewAllReporters);
// router.get('/bugreporter/:id', reporterController.viewSingleReporter);
// router.put('/bugreporter/:id', reporterController.updateReporter);