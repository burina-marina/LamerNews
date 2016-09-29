'use strict';
var gravatar = require('gravatar');


var articleService = require('./../services/article.service');
var userService = require('./../services/user.service.js');
var notification = require('./../services/notification.service');


var Article = require('./../models/article.model');
var User = require('./../models/user.model');
var Comment = require('./../models/comment.model');



//TODO: mongoose. findAndUpdate
var articleCtrl = {

    getLatestArticles: function(req, res) {
        console.log(req.params);
        Article
            .find({})
            .sort({ posted_date: -1 })
            .exec((err, arr) => articleService.getPartArticle(err, arr, req, res));
    },

    getTopArticles: function(req, res) {
        Article
            .find({})
            .sort({ rating: -1 })
            .exec((err, arr) => articleService.getPartArticle(err, arr, req, res));
    },

    gitArticleTitle: function(req, res) {
        let articleId = req.params.id;
        Article.findById(req.params.id)
            .then((rez) => {
                var article = {
                    articleId: rez._id,
                    link: rez.link,
                    title: rez.title,
                }
                res.json(article)
            });
    },

    getArticle: function(req, res) {
        let articleId = req.params.id;
        Article.findById(req.params.id)
            .then((rez) => {
                var article = {
                    articleId: rez._id,
                    title: rez.title,
                    link: rez.link,
                    author: rez.author,
                    postedDate: rez.posted_date,
                    rating: rez.rating,
                    commentCount: rez.comments_count,
                    isVoted: req.isAuthorized && !rez.votes.find((el) => el == req.userId)
                };

                var promise = new Promise((resolve) => {
                    userService.findUserById(req, res, article.author, (user) => {
                        article.isAdmin = req.userId == article.author;
                        article.author = user.username;
                        article.authorPhoto = gravatar.url(user.email, { s: '60', r: 'x', d: 'retro' }, true);
                        resolve();
                    });
                })
                promise.then(() => {
                    res.json(article)
                });
            })
    },

    getArticleComments: function(req, res) {
        let articleId = req.params.id;
        Article.findById(articleId).then((article) => {
            Comment
                .find({ article: articleId })
                .sort({ posted_date: -1 })
                .exec((err, arr) => {
                    var commentsArr = [];
                    let promiseArray = [];

                    for (let i = 0; i < arr.length; i++) {
                        commentsArr.push({
                            commentId: arr[i]._id,
                            authorId: arr[i].author,
                            commentBody: arr[i].comment_body,
                            postedDate: arr[i].posted_date
                        });

                        promiseArray.push(
                            new Promise((resolve) => {
                                userService.findUserById(req, res, commentsArr[i].authorId, (user) => {
                                    commentsArr[i].authorName = user.username;
                                    commentsArr[i].authorPhoto = gravatar.url(user.email, { s: '60', r: 'x', d: 'retro' }, true);
                                    commentsArr[i].isAdmin = req.userId == commentsArr[i].authorId || req.userId == article.author;
                                    resolve();
                                });
                            })
                        )
                    }

                    Promise.all(promiseArray)
                        .then(() => {
                            res.json(commentsArr)
                        })
                });
        })
    },

    postArticle: function(req, res) {
        var article = new Article();
        article.author = req.userId;
        for (let key in req.body) {
            article[key] = req.body[key];
        }

        article.save()
            .then(() => {
                User.findById(req.userId)
                    .then((user) => {
                        user.articles_count += 1;
                        user.save()
                            .then(() => {
                                res.status(200).send({ message: 'Article saved successful!' });
                            })
                    })

            }).
        catch(() => notification.serverErr(res))
    },

    updateArticle: function(req, res) {
        articleService.findArticleById(req, res, req.params.id, (article) => {
            if (article.author == req.userId) {
                for (let key in req.body) {
                    article[key] = req.body[key];
                }
                articleService.saveArticle(article, res, function() {
                    res.status(200).send({ message: 'Article updated successful!' });
                });
            } else {
                notification.accessErr(res);
            }
        })
    },

    deleteArticle: function(req, res) {
        Article.findByIdAndRemove(req.params.id)
            .then(() => {
                Comment
                    .find({ article: req.params.id })
                    .then((arr) => {
                        for (let comment of arr) {
                            User.findByIdAndUpdate(comment.author, { $inc: { comments_count: -1 } })
                                .then(() => {
                                    Comment.findByIdAndRemove(comment._id)
                                        .then(() => {})
                                })
                        }
                    })
            })
            .then(() => { res.status(200).send({ message: 'Article was deleted successful!' }) })
            .catch(() => notification.serverErr(res))
    },

    setRating: function(req, res) {
        articleService.findArticleById(req, res, req.params.id, (article) => {
            if (!article.votes.find((el) => el == req.userId)) {
                article.rating += req.params.state == "up" ? 1 : -1;

                article.votes.push(req.userId);
                article.save()
                    .then(() => res.status(200).send({ status: '200', message: "вашголос учтен" }))
                    .catch(() => notification.serverErr(res))

            } else {
                res.status(409).send({ status: '409', message: "вы уже голосовали" });
            }
        });
    }

};

module.exports = articleCtrl;