'use strict';
var gravatar = require('gravatar');

var User           = require('./../models/user.model');
var Article        = require('./../models/article.model');
var Comment        = require('./../models/comment.model');

var notification   = require('./../services/notification.service');
var userService    = require('./../services/user.service');
var articleService = require('./../services/article.service');
var authenticationService = require('./../services/authentication.service');


var userCtrl = {

    createUser: function (req, res) {
        var checkArr = [];
        checkArr.push(
            userService.checkUserForSaving('username', req.body.username),
            userService.checkUserForSaving('email', req.body.email)
        );

        Promise.all(checkArr)
            .then(
                function() {
                    console.log('before saving');

                    var user = new User();
                    user.username = req.body.username;
                    user.password = req.body.password;
                    user.email = req.body.email;

                    user.save()
                        .then(() => authenticationService.createToken(req, res))
                        .catch(() => notification.serverErr(res));

                },
                function(reason) {
                    console.log(reason);
                    res.status(409).send({status:'409', message: reason});
                }
            );
    },

    getUser: function (req, res, next) {

        userService.findUser(req, res, function (user) {
            let publicUserData = {};
            let userData = {
                _id: user._id,
                avatar: gravatar.url(user.email ,  {s: '100', r: 'x', d: 'retro'}, true),
                email: user.email,
                password: user.password,
                username: user.username,
                articlesCount: user.articles_count,
                commentCount: user.comments_count,
                registrationDate: user.registration_date
            };

            for (let key of Object.keys(userData)) {
                if (key !== 'password' && key !== '_id') {
                    publicUserData[key] = userData[key];
                }
            }


            if (req.isAdmin) {
                res.json({
                    isAdmin: req.isAdmin,
                    user: userData
                })
            } else {
                res.json({
                    isAdmin: req.isAdmin,
                    user: publicUserData
                })
            }
        })
    },

    updateUserPassword: function (req, res) {
        userService.findUser(req, res, function (user) {
            if (req.isAdmin) {
                if (req.body.oldPassword == user.password) {
                    user.password = req.body.newPassword;
                    userService.saveUser(res, user);
                } else {
                    res.status(400).send({status: '400', message: 'error data'});
                }
            } else {
                return notification.accessErr(res);
            }
        });
    },

    updateUserEmail: function (req, res) {
        console.log(req.body);
        User.findOne({username: !req.params.username, email: req.body.email})
            .then((user) => {
                if (user) {
                    res.status(409).send({status: '409', message: 'already exist'});
                } else {
                    userService.findUser(req, res, function (user) {
                        if (req.isAdmin) {
                            user.email = req.body.email;
                            user.save()
                                .then(() => {
                                    var avatar = gravatar.url(req.body.email ,  {s: '100', r: 'x', d: 'retro'}, true);
                                    return res.status(200).send({status: '200', message: 'successful', avatar: avatar})
                                })
                                .catch(() => notification.serverErr(res))
                        } else {
                            return notification.accessErr(res);
                        }
                    })
                }
            })
            .catch((err) => notification.serverErr(res));
    },

    getUserPhoto: function (req, res) {
        User
            .findOne({username: req.params.username})
            .then((user) => {
                var avatar = gravatar.url(user.email ,  {s: '80', r: 'x', d: 'retro'}, true);
                res.json(avatar)
            })
            .catch(() => notification.notFound(res))

    },

    getUserPosts: function (req, res) {
        User
            .findOne({username: req.params.username})
            .then((user) => {
                req.autorId = user._id;
                Article
                    .find({author: req.autorId})
                    .sort({posted_date: -1})
                    .exec((err, arr) => articleService.getPartArticle(err, arr, req, res));
            })
            .catch(() => notification.notFound(res))

    },


    getUserComments: function (req, res) {
        userService.findUser(req, res, (user) => {
            var userId = user._id;
            Comment
                .find({author: user._id})
                .sort({posted_date: -1})
                .exec((err, arr) => {
                    if (arr[0] !== undefined) {
                        console.log('not empty arr')
                        let commentsArr = [];
                        let promiseArr = [];
                        for (let i = 0; i < arr.length; i++) {
                            commentsArr.push({
                                commentId: arr[i]._id,
                                postedDate: arr[i].posted_date,
                                articleId: arr[i].article,
                                commentBody: arr[i].comment_body,
                                isAdmin: arr[i].author == req.userId
                            });
                            promiseArr.push(
                                new Promise((resolve, reject) => {
                                    articleService.findArticleById(req, res, commentsArr[i].articleId, (article) => {
                                        commentsArr[i].articleName = article.title;
                                        commentsArr[i].articleLink = article.link;
                                        resolve();
                                    });
                                }));
                        }

                        Promise.all(promiseArr)
                            .then(() => {
                                console.log('after promises')
                                res.json({commentsArr: commentsArr});
                            });
                    } else {
                        return res.json({commentsArr: []})
                    }
                })
        });
    }
};

module.exports = userCtrl;
