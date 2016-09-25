var express    = require('express');

var authenticationService = require('./../services/authentication.service');

var commentCtrl           = require('./../controllers/comment.controller');

var commentRouter    = express.Router();
var addCommentRouter = express.Router();
var deleteCommentRouter = express.Router();


commentRouter.use('/add/to', addCommentRouter);
addCommentRouter
    .use('/:id', authenticationService.checkAuthorization)
    .post('/:id', commentCtrl.saveComment)
    .use('/:id', commentCtrl.addCommentToArticle)
    .use('/:id', commentCtrl.addCommentToUser)
    .use('/:id', commentCtrl.getCommentInfo);


commentRouter.use('/delete/', deleteCommentRouter);
deleteCommentRouter
    .use('/:id', authenticationService.checkAuthorization)
    .delete('/:id', commentCtrl.deleteComment)
    .use('/:id', commentCtrl.deleteCommentFromArticle)
    .use('/:id', commentCtrl.deleteCommentFromUser);

module.exports = commentRouter;
