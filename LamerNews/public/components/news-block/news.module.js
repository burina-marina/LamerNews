import angular from 'angular';

import NewsBlockComponent from './news-block.component';
import NewsItemComponent from './../news-item/news-item.component';
import NewsListComponent from './../news-list/news-list.component';
import NewsInfoComponent from './../news-info/news-info.component';

import NewsBlockService from './news-block.service';

import NewsCreatingComponent from './../news-creating/news-creating.component';
import NewsUpdatingComponent from './../news-updating/news-updating.component';
import NewsDetailsComponent from './../news-details/news-details.component';

import CommentComponent from './../comment/comment.component';
import CommentCreatingComponent from './../comment-creating/comment-creating.component';
import CommentsListComponent from './../comments-list/comments-list.component';

angular
    .module('news', [])
    
    .service('newsBlockService', NewsBlockService)

    .component('newsBlock', new NewsBlockComponent())
    .component('newsList', new NewsListComponent())
    .component('newsItem', new NewsItemComponent())
    .component('newsDetails', new NewsDetailsComponent())
    .component('newsInfo', new NewsInfoComponent())
    .component('newsCreating', new NewsCreatingComponent())
    .component('newsUpdating', new NewsUpdatingComponent())
    .component('comment', new CommentComponent())
    .component('commentsList', new CommentsListComponent())
    .component('commentCreating', new CommentCreatingComponent())

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('newsBlock', {
                template: `<news-block></news-block`,
                url: '/news/:type'
            })

            .state('newsBlock.details', {
                template: `<news-details
                                data-article="$resolve.article"
                                data-comments-arr="$resolve.commentsArr"
                            ></news-details>`,
                url: '/:id',
                resolve: {
                    article: ($stateParams, newsBlockService, requestsService, urlConfig, handlerService) => {
                        if (Object.keys(newsBlockService.preview.article).length !== 0) {
                            let url = urlConfig.getUserPhotoUrl(newsBlockService.preview.article.author);
                            let promise = requestsService.fetchData(url);
                            return promise.then((userPhoto) => {
                                newsBlockService.preview.article.authorPhoto = userPhoto;
                                return newsBlockService.preview.article;
                            })
                        } else {
                            let url = urlConfig.getArticleUrl($stateParams.id)
                            let promise = requestsService.fetchData(url);
                            return promise.then((article) => {
                                newsBlockService.preview.article = article;
                                newsBlockService.preview.article.postedDate = handlerService.timespanToHumanString(article.postedDate);
                                return newsBlockService.preview.article;
                            })
                        }
                    },
                    commentsArr: ($stateParams, urlConfig, requestsService) => {
                        let url = urlConfig.getArticleDetailsUrl($stateParams.id)
                        return requestsService.fetchData(url);
                    }
                }
            })

            .state('submit', {
                template: '<news-creating></news-creating>',
                url: '/submit'
            })
            
            .state('article', {
                template: `<news-details
                            data-article="$resolve.article"
                            data-comments-arr="$resolve.commentsArr"
                        ></news-details>`,
                url: '/article/:id',
                resolve: {
                    article: ($stateParams, newsBlockService, requestsService, urlConfig, handlerService) => {
                        let url = urlConfig.getArticleUrl($stateParams.id)
                        let promise = requestsService.fetchData(url);
                        return promise.then((article) => {
                            article.postedDate = handlerService.timespanToHumanString(article.postedDate);
                            return article;
                        })
                    },
                    commentsArr: ($stateParams, urlConfig, requestsService) => {
                        let url = urlConfig.getArticleDetailsUrl($stateParams.id)
                        return requestsService.fetchData(url);
                    }
                }
            })

    });