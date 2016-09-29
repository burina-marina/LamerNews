import angular from 'angular';

import NewsBlockComponent from './news-block.component';
import NewsItemComponent from './../news-item/news-item.component';
import NewsListComponent from './../news-list/news-list.component';
import NewsInfoComponent from './../news-info/news-info.component';

// import NewsService from './news-block.service';
import NewsBlockService from './news-block.service';

import NewsCreatingComponent from './../news-creating/news-creating.component';
import NewsUpdatingComponent from './../news-updating/news-updating.component';
import NewsDetailsComponent from './../news-details/news-details.component';
// import ArticleInfoComponent from './../article-info/article-info.component';

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

.component('newsBlock', new NewsBlockComponent())
    .component('newsList', new NewsListComponent())
    .component('newsItem', new NewsItemComponent())
    .component('newsDetails', new NewsDetailsComponent())
    .component('newsInfo', new NewsInfoComponent())
    .component('newsCreating', new NewsCreatingComponent())
    .component('newsUpdating', new NewsUpdatingComponent())
    // .component('articleInfo', new ArticleInfoComponent())
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
        template: `<news-updating
                    data-state="$resolve.state"
                    data-article="$resolve.article"
                ></news-updating>`,
        url: '/article/:id',
        resolve: {
            state: ($state) => {
                return { url: $state.current.name, param: $state.params }
            },
            article: (requestsService, urlConfig, $stateParams) => {
                let url = urlConfig.getArticleTitleUrl($stateParams.id)
                let promise = requestsService.fetchData(url);
                return promise.then((article) => {
                    return article;
                })
            }
        }
    })

});