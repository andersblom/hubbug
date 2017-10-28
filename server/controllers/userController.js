const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const promisify = require('es6-promisify');

// Creating user
// POST /user/create

exports.validateNewUser = (req, res, next) => {
    console.log("validating user");
    next();
}

exports.createUser = async (req, res, next) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
    });

    const register = promisify(User.register, User);
    await register(user, req.body.password);
    res.status(201);
    res.json({
        user
    });
}

// Logging in
// POST /users 
exports.loginAsUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        // User wasn't found
        if (!user) {
            res.status(204);
            res.json({
                message: "No user was found",
            });
        }

        // Password was wrong
        if (user.password !== md5(req.body.password)) {
            res.status(204);
            res.json({
                message: "Wrong password"
            });
        } 

        // Assuming user is found and password is OK:
        res.status(200);
        res.json({
            message: "success",
            result: user
        });

    } catch(err) {
        next(err);
    }
}