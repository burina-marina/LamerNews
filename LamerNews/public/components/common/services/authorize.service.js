class AuthorizeService {

    constructor(userIdentification, $state, urlConfig, requestsService) {
        this.userIdentification = userIdentification;
        this.$state = $state;
        this.urlConfig = urlConfig;
        this.requestsService = requestsService;

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
                that.$state.go('newsBlock', { type :'top'});
        })
    }

    logOut() {
        this.userIdentification.delUser();
        if (this.$state.current.name === 'newsBlock') {
            this.$state.reload('newsBlock');
        } else {
            this.$state.go('newsBlock', {type: 'top'});
        }
    }

    checkIn(body) {
        let that = this;
        let url = this.urlConfig.createUserUrl;
        let promiseResponse = this.requestsService.postData(url, body);

        return promiseResponse
            .then((data) => {
                that.userIdentification.setUser(data);
                that.$state.go('newsBlock', {type: 'top'});
            })
    }

    // authenticate(body) {
    //     return fetch(this.urlConfig.authenticateUserUrl, this.getRequestParams(body))
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 return res.json()
    //             } else {
    //                 return Promise.reject(res.status)
    //             }
    //         })
    //
    //         .then((data) => {
    //             this.identification.setUser(data);
    //             this.$state.go('top', { page :'1'});
    //         })
    // }
}

AuthorizeService.$inject = ['userIdentification', '$state', 'urlConfig', 'requestsService'];
export default AuthorizeService;
