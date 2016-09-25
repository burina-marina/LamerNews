'use strict';

var Comment      = require('./../models/comment.model');
var notification = require('./notification.service');

var commentService = {

    findCommentById: function(req, res, id, handler) {
        Comment.findById(id, function (err, comment) {
            if (err) { return notification.serverErr(res) }
            if (comment) {
                handler(comment);
            } else {
                notification.notFound(res);
            }
        });
    },

    saveComment: function (comment, res, handler) {
        comment.save(function (err) {
            if (err) {
                notification.serverErr(res)
            } else {
                handler();
            }
        });
    }
};


module.exports = commentService;