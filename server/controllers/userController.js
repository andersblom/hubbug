const User = require("../models/User");
const md5 = require("md5");

// Creating user
// POST /users/create
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await (new User(req.body));
        newUser.save(err => {
            if (err) {
                throw new Error(err);
            }
        });
        res.status(201);
        res.json({
            message: "success",
            result: newUser
        });
    } catch (err) {
        next(err);
    }
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