
class NewsCreatingController {

    constructor(userIdentification, requestsService, urlConfig, $state, toastr) {
        this.userIdentification = userIdentification;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.$state = $state;
        this.toastr = toastr;
    }

    $onInit() {
        if (!this.userIdentification.isAuthorized) {
            this.$state.go('authorize.login')
        }
    }

    formSubmit() {
        let that = this;
        let url = this.urlConfig.createArticleUrl;
        let promiseResponse = this.requestsService.postData(url, this.data);
        promiseResponse
            .then((data) => {
                that.toastr.success('You article is created');
                that.data.title = '';
                that.data.link = '';
                that.createArticleForm.$setPristine();
            })
            .catch((data) => that.toastr.error('Sorry. Server Error'))
    }

}

NewsCreatingController.$inject = ['userIdentification', 'requestsService', 'urlConfig', '$state', 'toastr'];

export default NewsCreatingController;
