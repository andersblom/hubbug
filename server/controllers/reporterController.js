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

exports.viewAllReporters = (req, res) => {

}

exports.viewSingleReporter = (req, res) => {

}

exports.updateReporter = (req, res) => {

}

// router.post('/bugreporter/create', reporterController.createReporter);
// router.get('/bugreporter', reporterController.viewAllReporters);
// router.get('/bugreporter/:id', reporterController.viewSingleReporter);
// router.put('/bugreporter/:id', reporterController.updateReporter);