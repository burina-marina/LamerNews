import angular from 'angular';

import UserComponent from './user.component';
import UserInfoComponent from './../user-info/user-info.component';
import CommentsListComponent from './../comments-list/comments-list.component';


import UserService from './user.service';
import UserInfoService from './../user-info/user-info.service';


angular.module('user', [])
    .service('userService', UserService)
    .service('userInfoService', UserInfoService)

    .component('user', new UserComponent())
    .component('userInfo', new UserInfoComponent())
    // .component('newsList', new NewsListComponent())
    .component('commentsList', new CommentsListComponent())



    .config(function($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.when('/user/:username', '/user/:username/posts');

        $stateProvider
            .state('user', {
                template: '<user data-server-user-info="$resolve.serverUserInfo"></user>',
                url: '/user/:username',
                resolve: {
                    serverUserInfo: (requestsService, $stateParams, urlConfig) => {
                        debugger
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
                    data-server-data="$resolve.serverData"
                    data-count="$resolve.userInfo"
                    data-user="$resolve.userInfo"
                ></comments-list>`,
                url: '/comments',
                resolve: {
                    serverData: (userService, $stateParams, urlConfig, $state) => {
                        return userService.getUserActivity(urlConfig.getUserCommentsUrl($stateParams.username));
                    },
                    userInfo: (serverUserInfo) => {
                        return serverUserInfo.user;
                    }

                }
            });

    });



// .state('user', {
//     template: '<user data-username="$stateParams.username"></user>',
//     url: '/user/:username'
//
//
// });
        //
        // .state('authorize.login', {
        //     url: '/login',
        //     template: '<log-in></log-in>'
        // })
// template: '<news data-items="$resolve.items"></news>',
//     url: '/top/:page',
//     resolve: {
//     items: (newsService, $stateParams, urlConfig) => {
//         return newsService.fetchData($stateParams.page, urlConfig.topArticleUrl)
//     }
// }
        //
        // .state('authorize.registration', {
        //     url: '/registration',
        //     template: '<check-in></check-in>'
        // });
        //
        //
        // //
        // // .state('registration', {
        // //     template: '<authorize></authorize>',
        // //     url: '/registration'
        // // })
        // //
    // });
