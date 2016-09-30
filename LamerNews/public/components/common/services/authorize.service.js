class AuthorizeService {

    constructor(userIdentification, $state, urlConfig, requestsService, newsBlockService) {
        this.userIdentification = userIdentification;
        this.$state = $state;
        this.urlConfig = urlConfig;
        this.requestsService = requestsService;
        this.newsBlockService = newsBlockService;

    }

    checkAuthorization() {
        let that = this;
        let url = this.urlConfig.checkAuthorization;
        let promiseResponse = this.requestsService.postData(url);
        promiseResponse
            .then((isAuthorized) => {
                that.userIdentification.isAuthorized = isAuthorized;
            })
    }

    logIn(data) {
        let that = this;
        let url = this.urlConfig.authenticateUserUrl;
        let promiseResponse = this.requestsService.postData(url, data)
        return promiseResponse
            .then((data) => {
                that.userIdentification.setUser(data);
                that.$state.go('newsBlock', { type: 'top' });
            })
    }

    logOut() {
        this.userIdentification.delUser();
        this.newsBlockService.refresh();
        if (this.$state.current.name === 'newsBlock') {
            this.$state.reload('newsBlock');
        } else {
            this.$state.go('newsBlock', { type: 'top' });
        }
    }

    checkIn(body) {
        let that = this;
        let url = this.urlConfig.createUserUrl;
        let promiseResponse = this.requestsService.postData(url, body);

        return promiseResponse
            .then((data) => {
                that.userIdentification.setUser(data);
                that.$state.go('newsBlock', { type: 'top' });
            })
    }
}

AuthorizeService.$inject = ['userIdentification', '$state', 'urlConfig', 'requestsService', 'newsBlockService'];
export default AuthorizeService;