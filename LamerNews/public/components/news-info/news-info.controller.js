class NewsInfoController {

    constructor($state, toastr, $scope, requestsService, urlConfig, newsBlockService) {
        this.$state = $state;
        this.$scope = $scope;
        this.toastr = toastr;
        this.newsBlockService = newsBlockService;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.isShowControlPanel = this.article.isAdmin && (this.$state.current.name === 'newsBlock.details');
        this.isShowUpdateArticleForm = false;

    }

    // TODO to servis
    // setVote(article, direction) {
    //     let that = this;
    //     let url = this.urlConfig.getVoteArticleUrl(article.articleId, direction);
    //     let promiseResponse = this.requestsService.putRequest(url);
    //     promiseResponse
    //         .then((res) => {
    //             article.rating += direction == "up" ? 1 : -1;
    //             that.toastr.success('Your voice was accepted!');
    //             article.isVoted = false;
    //         })
    //         .catch(() => {
    //             that.toastr.error('You already voted!');
    //         })
    // }

    // deleteArticle() {
    //     let that = this;
    //     let url = this.urlConfig.getDeleteArticleUrl(this.article.articleId)
    //     let response = this.requestsService.deleteData(url);
    //     response
    //         .then((res) => {
    //             that.toastr.success('Article is deleted!');
    //             let state = that.$state.current.name.split('.')[0];
    //             that.$state.go(state);
    //         })
    //         .catch(() => {
    //             that.toastr.error('Server Err');
    //         })
    // }

    // updateArticle(data) {
    //     let that = this;
    //     let url = this.urlConfig.getUpdateArticleUrl(this.article.articleId)
    //     let response = this.requestsService.putData(url, data);
    //     response
    //         .then((res) => {
    //             that.toastr.success('You article is updated');
    //             that.isShowUpdateArticleForm = false;
    //             that.article.title = data.title;
    //             that.article.link = data.link;
    //         })
    //         .catch((data) => that.toastr.error('Sorry. Server Error'))
    // }

    closeShowUpdateArticleForm() {
        this.isShowUpdateArticleForm = false;
    }




}

NewsInfoController.$inject = ['$state', 'toastr', '$scope', 'requestsService', 'urlConfig', 'newsBlockService'];

export default NewsInfoController;