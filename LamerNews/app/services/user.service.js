'use strict';

var User         = require('./../models/user.model.js');
var notification = require('./notification.service');

var userService = {

    checkUserForSaving: function (param, value) {

        var query = {};
        query[param] = value;

        return User.findOne(query).then((user) => {
            if (user) return Promise.reject(param);
        })
    },


    findUserById: function(req, res, id, handler) {
        User.findById(id)
            .then((user) => {
                if (user) {
                    handler(user);
                } else {
                    notification.notFound(res);
                }
            })
            .catch((err) => notification.serverErr(res));
    },


    findUser: function (req, res, handler) {
        User.findOne({username: req.params.username})
            .then((user) => {
                if (user) {
                    handler(user);
                } else {
                    notification.notFound(res);
                }
            })
            .catch((err) => notification.serverErr(res));
    },
    
    saveUser: function (res, user) {
        user.save()
            .then(() => notification.goodRequest(res))
            .catch(() => notification.serverErr(res))
    }



};


module.exports = userService;