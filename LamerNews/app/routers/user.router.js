var express    = require('express');

var authenticationService = require('./../services/authentication.service');
var userCtrl              = require('./../controllers/user.controller');

var userRouter    = express.Router();
var userInfoRouter    = express.Router();


userRouter.route('/authenticate').post(authenticationService.createToken);
userRouter.route('/checkautorization').post(authenticationService.getAuthorizedValue);

userRouter.route('/create').post(userCtrl.createUser);
// userRouter.route('/authenticate').post(authenticationService.createToken);

userRouter.use('/info', userInfoRouter);

userInfoRouter.use('/:username', authenticationService.checkToken);
userInfoRouter.route('/:username').get(userCtrl.getUser);

userInfoRouter.use('/:username/password', authenticationService.checkToken);
userInfoRouter.route('/:username/password').put(userCtrl.updateUserPassword);

userInfoRouter.use('/:username/email', authenticationService.checkToken);
userInfoRouter.route('/:username/email').put(userCtrl.updateUserEmail);

userInfoRouter.use('/:username/posts/:page', authenticationService.checkToken);
userInfoRouter.route('/:username/posts/:page').get(userCtrl.getUserPosts);


userInfoRouter.use('/:username/comments', authenticationService.checkToken);
userInfoRouter.route('/:username/comments').get(userCtrl.getUserComments);


userRouter.route('/:username/photo').get(userCtrl.getUserPhoto);


module.exports = userRouter;
