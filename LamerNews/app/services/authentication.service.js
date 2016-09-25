'use strict';

var jwt          = require('jsonwebtoken');
var gravatar     = require('gravatar');


var notification = require('./notification.service');
var User         = require('./../models/user.model');
var config       = require('./../config/config');


var authentication = {
    checkAdmin: function(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    return notification.serverErr(res);
                } else {
                    req.isAdmin = decoded.username == username;
                    if (req.isAdmin) {
                        req.userId = decoded.id;
                        next();
                    } else {
                        return notification.accessErr(res);
                    }
                }
            });
        } else {
            return notification.accessErr(res);
        }
    },

    checkAuthorization: function (req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    return notification.serverErr(res);
                } else {
                    req.isAuthorized = true;
                    req.userId = decoded.id;
                    next();
                }
            });
        } else {
            return notification.accessErr(res);
        }
    },

    getAuthorizedValue: function (req, res) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    res.json(false);
                } else {
                    res.json(true);
                }
            });
        } else {
            res.json(false);
        }
    },

    checkToken: function (req, res, next) {
        let username = req.params.username;

        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    return notification.serverErr(res);
                } else {
                    req.isAdmin = decoded.username == username;
                    req.isAuthorized = true;
                    req.userId = decoded.id;
                    next();
                }
            });
        } else {
            req.isAdmin = false;
            req.isAuthorized = false;
            next();
        }
    },

    createToken: function (req, res, next) {
        User.findOne(
            {
                username: req.body.username
            },
            function (err, user) {
                if (err) {return notification.serverErr(res)}
                if ((!user) || (user.password != req.body.password)) {
                    res.status(401).send({status: '401', message: "Login or Password is not valid"});
                } else {
                     req.body.token = jwt.sign({
                            id: user._id,
                            username: user.username
                        }, config.secretKey);
                    res.json({
                        token: req.body.token,
                        username: user.username,
                        userPhoto: gravatar.url(user.email ,  {s: '60', r: 'x', d: 'retro'}, true),
                        isAuthorized: true
                    });
                }
            })
    }
};

module.exports = authentication;
