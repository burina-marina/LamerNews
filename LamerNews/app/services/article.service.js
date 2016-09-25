'use strict';

var Article      = require('./../models/article.model');
var notification = require('./notification.service');
var config         = require('./../config/config');
var userService  = require('./user.service');


var articleService = {

    getPartArticle: function(err, arr, req, res) {
        if (err) {return notification.serverErr(res);}
        if (arr.length == 0 && req.params.page == 1) {
            return res.json({
                isAdmin: req.isAdmin,
                articlesArr: [],
                arrLength: arr.length
            })
        }
        let indexFrom = (req.params.page - 1) * config.pageLimit;
        let indexTo = indexFrom + config.pageLimit;
        let promiseArray = [];

        if (indexFrom < arr.length) {
            let articlesArr = [];

            for (let i = indexFrom; i < indexTo && i < arr.length; i++) {
                articlesArr.push({
                    articleId: arr[i]._id,
                    title: arr[i].title,
                    link: arr[i].link,
                    author: arr[i].author,
                    postedDate: arr[i].posted_date,
                    rating: arr[i].rating,
                    commentCount: arr[i].comments_count,
                    isVoted: req.isAuthorized && !arr[i].votes.find((el) => el == req.userId),
                    isAdmin: req.userId == arr[i].author
                });

                let index = articlesArr.length - 1;

                // if request from user-profile
                if (req.params.username) {
                    articlesArr[index].author = req.params.username;
                } else {
                    // find all users name by id
                    promiseArray.push(
                        new Promise((resolve) => {
                            userService.findUserById(req, res, articlesArr[index].author, (user) => {
                                articlesArr[index].author = user.username;
                                resolve();
                            })
                        })
                    )
                }
            }

            Promise.all(promiseArray)
                .then(() => {
                    res.json({
                        // isAdmin: req.isAdmin,
                        articlesArr: articlesArr,
                        arrLength: arr.length
                    })
                })
                .catch((err) => notification.notFound(res))

        } else {
            return notification.notFound(res);
        }
    },


    findArticleById: function(req, res, id, handler) {
        Article.findById(id, function (err, article) {
            if (err) { return notification.serverErr(res) }
            if (article) {
                handler(article);
            } else {
                notification.notFound(res);
            }
        });
    },

    saveArticle: function (article, res, handler) {
        article.save(function (err) {
            if (err) {
                notification.serverErr(res)
            } else {
                handler();
            }
        });
    }
};


module.exports = articleService;
