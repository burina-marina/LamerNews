import angular from 'angular';

import AuthorizeComponent from './authorize.component';
import LogInComponent from './../log-in/log-in.component';
import CheckInComponent from './../check-in/check-in.component';

angular.module('authorize', [])

    .component('authorize', new AuthorizeComponent())
    .component('logIn', new LogInComponent())
    .component('checkIn', new CheckInComponent())

    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('authorize', {
            template: '<authorize></authorize>',
            url: ''
        })

        .state('authorize.login', {
            url: '/login',
            template: '<log-in></log-in>'
        })

        .state('authorize.registration', {
            url: '/registration',
            template: '<check-in></check-in>'
        });
    });
