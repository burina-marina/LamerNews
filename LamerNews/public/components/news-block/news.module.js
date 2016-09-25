import angular from 'angular';

import NewsBlockComponent from './news-block.component';
import NewsItemComponent from './../news-item/news-item.component';
import NewsListComponent from './../news-list/news-list.component';

// import NewsService from './news-block.service';
import NewsBlockService from './news-block.service';

import NewsCreatingComponent from './../news-creating/news-creating.component';
import UpdatingArticleComponent from './../updating-article/updating-article.component';
// import NewsArticleComponent from './../news-article/news-article.component';
import NewsDetailsComponent from './../news-details/news-details.component';
import ArticleInfoComponent from './../article-info/article-info.component';
import CommentComponent from './../comment/comment.component';
import CommentCreatingComponent from './../comment-creating/comment-creating.component';
import CommentsListComponent from './../comments-list/comments-list.component';
//
// import NewsService from './news-block.service';
// import NewsBlockService from './news-block.service';
//
// import NewArticleService from './../new-article/new-article.service';
// import NewsArticleService from './../news-article/news-article.service';
// import ArticleDetailsService from './../article-details/article-details.service';
// import CommentService from './../comment/comment.service';
// import CommentCreatingService from './../comment-creating/comment-creating.service';
//
// import ArticleService from './../article-info/article.service';

angular.module('news', [])
    // .service('newsService', NewsService)
    .service('newsBlockService', NewsBlockService)
    // .service('newsListService', NewsBlockService)

    // .service('newArticleService', NewArticleService)
    // .service('newsArticleService', NewsArticleService)
    // .service('articleDetailsService', ArticleDetailsService)
    // .service('commentService', CommentService)
    // .service('commentCreatingService', CommentCreatingService)

    // .service('articleService', ArticleService)

    .component('newsItem', new NewsItemComponent())
    .component('newsBlock', new NewsBlockComponent())
    .component('newsList', new NewsListComponent())

    // .component('newsArticle', new NewsArticleComponent())
    .component('newsCreating', new NewsCreatingComponent())
    .component('updatingArticle', new UpdatingArticleComponent())
    .component('newsDetails', new NewsDetailsComponent())
    .component('articleInfo', new ArticleInfoComponent())
    .component('comment', new CommentComponent())
    .component('commentsList', new CommentsListComponent())

    .component('commentCreating', new CommentCreatingComponent())

    .config(function($stateProvider, $urlRouterProvider) {


        // $urlRouterProvider.when('', '/top/1');

        $stateProvider

            .state('newsBlock', {
                template: `<news-block></news-block`,
                url: '/news/:type'
            })

            // .state('newsBlock.newsList', {
            //     url: '/:page',
            //     // template: '<news-list></news-list>'
            //     views: {
            //         "newsList": {
            //             template: `
            //             <div ui-sref="news.newsList.details({id: 5})">Show details</div>`
            //         }
            //     }
            // })
            // .state('news.newsList.details', {
            //     url: '',
            //     // template: '<news-list></news-list>'
            //     views: {
            //         "details@news": {
            //             template: 'in details',
            //             // url: '/:page',
            //         }
            //     }
            // })

            // .state('top', {
            //     template: '<news data-server-data="$resolve.serverData" data-state-name="$resolve.stateName"></news>',
            //     url: '/top/:page',
            //     resolve: {
            //         serverData: (newsService, $stateParams, urlConfig) => {
            //             return newsService.fetchData(urlConfig.getTopArticleUrl($stateParams.page))
            //         },
            //         stateName: () => 'top'
            //     }
            // })
            //
            // .state('latest', {
            //     template: '<news class="all-news" data-server-data="$resolve.serverData" data-state-name="$resolve.stateName"></news>',
            //     url: '/latest/:page',
            //     resolve: {
            //         serverData: (newsService, $stateParams, urlConfig) => {
            //             return newsService.fetchData(urlConfig.getLatestArticleUrl($stateParams.page))
            //         },
            //         stateName: () => 'latest'
            //     }
            // })
            //
            // .state('top.details', {
            //     template: `<article-details
            //         data-article="$resolve.article"
            //         data-admin-photo="$resolve.adminPhoto"
            //         data-author-photo="$resolve.authorPhoto"
            //         data-server-data="$resolve.serverCommentsData"
            //         data-parent-state-name="$resolve.parentStateName"
            //     ></article-details>`,
            //     url: '/:id',
            //     resolve: {
            //         article: ($stateParams, serverData) => {
            //             return serverData.articlesArr.find((article) => (article.articleId == $stateParams.id));
            //         },
            //         authorPhoto: ($stateParams, serverData, articleDetailsService) => {
            //             var article = serverData.articlesArr.find((article) => (article.articleId == $stateParams.id));
            //             return articleDetailsService.getArticleAuthorPhoto(article.author);
            //         },
            //         adminPhoto: ($stateParams, articleDetailsService, identification) => {
            //             if (identification.username) {
            //                 return articleDetailsService.getArticleAuthorPhoto(identification.username);
            //             } else {
            //                 return false;
            //             }
            //         },
            //         serverCommentsData: ($stateParams, serverData, articleDetailsService) => {
            //             return articleDetailsService.fetchData($stateParams.id);
            //         },
            //         parentStateName: () => 'top'
            //     }
            // })
            //
            // data-article="$resolve.article"
            // data-admin-photo="$resolve.adminPhoto"
            // data-author-photo="$resolve.authorPhoto"
            // data-server-data="$resolve.serverCommentsData"
            // data-parent-state-name="$resolve.parentStateName"
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
                                return newsBlockService.preview.article
                            })
                        }
                    },
                    commentsArr: ($stateParams, urlConfig, requestsService) => {
                        let url = urlConfig.getArticleDetailsUrl($stateParams.id)
                        return requestsService.fetchData(url);
                    }
                }
            })
            // authorPhoto: ($stateParams, serverData, articleDetailsService) => {
            //     var article = serverData.articlesArr.find((article) => (article.articleId == $stateParams.id));
            //     return articleDetailsService.getArticleAuthorPhoto(article.author);
            // },
            // adminPhoto: ($stateParams, articleDetailsService, identification) => {
            //     if (identification.username) {
            //         return articleDetailsService.getArticleAuthorPhoto(identification.username);
            //     } else {
            //         return false;
            //     }
            // },
            //
            .state('submit', {
                template: '<news-creating></news-creating>',
                url: '/submit'
            })
            //
            .state('article', {
                template: `<article-details
                    data-article="$resolve.article"
                    data-admin-photo="$resolve.adminPhoto"
                    data-server-data="$resolve.serverCommentsData"
                ></article-details>`,
                url: '/article/:id',
                resolve: {
                    articleData: (newsService, $stateParams, urlConfig) => {
                        return newsService.fetchData(urlConfig.getArticleUrl($stateParams.id));
                    },
                    article: (articleData, handlerService ) => {
                        articleData.article.postedDate = handlerService.timespanToHumanString(articleData.article.postedDate)
                        return articleData.article;
                    },
                    adminPhoto: ($stateParams, articleDetailsService, identification) => {
                        if (identification.username) {
                            return articleDetailsService.getArticleAuthorPhoto(identification.username);
                        } else {
                            return false;
                        }
                    },
                    serverCommentsData: (newsService, $stateParams, urlConfig) => {
                        return  newsService.fetchData(urlConfig.getArticleDetailsUrl($stateParams.id))
                    }
                }
            });


    });
