const User = require("../models/User");

// POST /users/create
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await (new User(req.body));
        newUser.save(err => {
            if (err) {
                throw new Error(err);
            }
        });
        res.json({
            success: {
                newUser
            }
        });
    } catch (err) {
        next(err);
    }
}

//