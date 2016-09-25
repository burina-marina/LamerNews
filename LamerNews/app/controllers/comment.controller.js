'use strict';
var Comment        = require('./../models/comment.model');
var Article        = require('./../models/article.model');

var userService    = require('./../services/user.service');
var articleService = require('./../services/article.service');
var commentService = require('./../services/comment.service');
var notification   = require('./../services/notification.service');


var commentCtrl = {

    saveComment: function (req, res, next) {
        let comment = new Comment();
        comment.author = req.userId;
        comment.article = req.params.id;
        comment.comment_body = req.body.comment_body;

        commentService.saveComment(comment, res, function() {
            req.comment = comment;
            next();
        })
    },

    addCommentToArticle: function (req, res, next) {
        articleService.findArticleById(req, res, req.params.id, (article) => {
            article.comments_count += 1;
            articleService.saveArticle(article, res, function () {
                next();
            });
        })
    },

    addCommentToUser: function (req, res, next) {
        userService.findUserById(req, res, req.userId, (user) => {
            user.comments_count += 1;
            user.save()
                .then(() => next())
                .catch(() => console.log('broken saving  user'))
            });
    },

    getCommentInfo: function (req, res, next) {
        userService.findUserById(req, res, req.userId, (user) => {
            var commentInfo = {
                commentId: req.comment._id,
                commentBody: req.comment.comment_body,
                postedDate: req.comment.posted_date,
                authorPhoto: user.user_photo,
                authorName: user.username
            };

            res.json(commentInfo);
        })
    },

    deleteComment: function (req, res, next) {
        commentService.findCommentById(req, res, req.params.id, (comment) => {
            var articleAuthor;
            var promise = new Promise((resolve) => {
                Article.findById(comment.article )
                    .then((article) => {
                        articleAuthor = article.author;
                        resolve();
                    })
            })

            promise.then(() => {
                if (comment.author == req.userId || articleAuthor == req.userId) {
                    req.articleId = comment.article;
                    comment.remove();
                    next();
                } else {
                    return notification.accessErr(res);
                }
            });
        })
    },

    deleteCommentFromArticle: function (req, res, next) {
        articleService.findArticleById(req, res, req.articleId, (article) => {
            article.comments_count -= 1;
            article.save()
                .then(() => next())
                .catch(() => console.log('broken article'))
        });
    },

    deleteCommentFromUser: function (req, res) {
        console.log(req.userId);
        userService.findUserById(req, res, req.userId, (user) => {
            user.comments_count -= 1;
            user.save()
                .then(() => res.status(200).send({message: "Comment deleted"}))
                .catch(() => console.log('brokenuser'))
        });
    }

};

module.exports = commentCtrl;
