const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reporterController = require('../controllers/reporterController');

const { catchErrors } = require('../handlers/errorHandlers');

router.post('/user/create', 
    userController.validateNewUser, 
    userController.createUser
);

router.post('/user', userController.loginAsUser);

router.post('/bugreporter/create', reporterController.createReporter);
router.get('/bugreporter', reporterController.viewAllReporters);
router.get('/bugreporter/:id', reporterController.viewSingleReporter);
router.put('/bugreporter/:id', reporterController.updateReporter);

module.exports = router;