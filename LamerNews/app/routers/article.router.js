var express    = require('express');

var authenticationService = require('./../services/authentication.service');

var articleCtrl           = require('./../controllers/article.controller');

var articleRouter        = express.Router();
var privateArticleRouter = express.Router();
var submitArticleRouter  = express.Router();
var getArticleRouter     = express.Router();
var changeArticleRouter  = express.Router();

articleRouter.use('/article', getArticleRouter);

getArticleRouter.use(authenticationService.checkToken);
getArticleRouter.route('/latest/:page').get(articleCtrl.getLatestArticles);
getArticleRouter.route('/top/:page').get(articleCtrl.getTopArticles);
getArticleRouter.route('/about/:id/comments').get(articleCtrl.getArticleComments);
getArticleRouter.route('/about/:id/').get(articleCtrl.getArticle);

articleRouter.use('/submit', submitArticleRouter);

submitArticleRouter.use(authenticationService.checkAuthorization);
submitArticleRouter.route('/').get((req, res) => res.status(200).send(({message: "Resolve access"})));
submitArticleRouter.route('/article').post(articleCtrl.postArticle);


articleRouter.use('/admin', privateArticleRouter);

privateArticleRouter.use(authenticationService.checkAuthorization);
privateArticleRouter.route('/article/:id')
    .put(articleCtrl.updateArticle)
    .delete(articleCtrl.deleteArticle);

articleRouter.use('/vote', changeArticleRouter);

changeArticleRouter.use(authenticationService.checkAuthorization);
changeArticleRouter.route('/article/:id/:state').put(articleCtrl.setRating);


module.exports = articleRouter;
