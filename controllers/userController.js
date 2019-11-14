let User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports.user_register = (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({username: req.body.username}).then(user => {
        if (user) {
            return res.status(400).json({error: "Username already exists"});
        } else {
            const newUser = new User({
                username: req.body.username,
                age: req.body.age,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });

        }
    });
};

module.exports.user_login = (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username}).then(user => {
        if (!user) {
            return res.status(404).json({error: "Username not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    email: user.email,
                    username: user.username
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 604800 // 1 week in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "JWT " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({error: "Password incorrect"});
            }
        });
    });
};

module.exports.user_get = (req, res) => {
    User.findOne({username: req.user.username}, function (err, user) {
        if (err) return res.json({success: false, error: err});
        return res.send(user);
    });
};

module.exports.user_update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({error: "Error"});
    }
    User.findOne({username: req.user.username}, function (err, user) {
        if (err) throw err;

        user.age = req.body.age;
        user.name = req.body.name;
        user.gender = req.body.gender;

        user.save(function (err) {
            if (err) throw err;
        });

        if (req.body.new_password && req.body.password) {
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    user.password = req.body.new_password;
                    bcrypt.hash(user.password, 10, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                } else {
                    return res.status(400).json({error: "Password incorrect"});
                }
            });
        }
    });
};

module.exports.user_delete = (req, res) => {
    const {username} = req.body;
    User.findByIdAndRemove(username, (err) => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
};