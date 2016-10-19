// /*Styles*/
import './components/common/styles/style.css';
import './components/common/styles/form-style.css';
import './components/common/styles/angular-toastr.min.css';
import './components/common/styles/perfect-scrollbar.css';

import SiteHeaderComponent from './components/site-header/site-header.component';

import UserIdentificationService from './components/common/services/user-identification.service';
import UrlConfigService from './components/common/services/url-config.service';
import RequestsService from './components/common/services/requests.service';
import HandlerService from './components/common/services/handler.service';
import AuthorizeService from './components/common/services/authorize.service';

import './components/news-block/news.module';
import './components/authorize/authorize.module';
import './components/user/user.module';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-toastr';
import 'angular-animate';
import 'ng-scrollbar';
import * as Ps from 'perfect-scrollbar';
window.Ps = Ps;


var lamernews = angular.module('lamernews', ['ui.router', 'ngAnimate', 'toastr', 'news', 'authorize', 'user', 'ngScrollbar']);
// 'authorize', 'user'
lamernews.component('siteHeader', new SiteHeaderComponent());
lamernews.service('userIdentification', UserIdentificationService);
lamernews.service('urlConfig', UrlConfigService);
lamernews.service('handlerService', HandlerService);
lamernews.service('requestsService', RequestsService);
lamernews.service('authorizeService', AuthorizeService);



lamernews.config(function(toastrConfig, $urlRouterProvider) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });

});