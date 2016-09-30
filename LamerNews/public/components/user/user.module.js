import angular from 'angular';

import UserComponent from './user.component';
import UserInfoComponent from './../user-info/user-info.component';
import CommentsListComponent from './../comments-list/comments-list.component';


// import UserService from './user.service';
// import UserInfoService from './../user-info/user-info.service';


angular.module('user', [])

.component('user', new UserComponent())
    .component('userInfo', new UserInfoComponent())

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/user/:username', '/user/:username/posts');
    $stateProvider
        .state('user', {
            template: '<user data-server-user-info="$resolve.serverUserInfo"></user>',
            url: '/user/:username',
            resolve: {
                serverUserInfo: (requestsService, $stateParams, urlConfig) => {
                    let url = urlConfig.getUserUrl($stateParams.username)
                    return requestsService.fetchData(url);
                }
            }
        })

    .state('user.posts', {
        template: `<news-list></news-list>`,
        url: '/posts',
    })

    .state('user.comments', {
        template: `<comments-list
                            data-comments-arr="$resolve.serverData.commentsArr"
                            data-binding-place="$resolve.userInfo"
                        ></comments-list>`,
        url: '/comments',
        resolve: {
            serverData: (requestsService, $stateParams, urlConfig, $state) => {
                let url = urlConfig.getUserCommentsUrl($stateParams.username)
                return requestsService.fetchData(url);
            },
            userInfo: (serverUserInfo) => {
                return serverUserInfo.user;
            }

        }
    });

});