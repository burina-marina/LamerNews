class ArticleInfoController {

    constructor($state, toastr, $scope, requestsService, urlConfig) {
        this.$state = $state;
        this.$scope = $scope;
        this.toastr = toastr;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;

        this.isShowControlPanel = this.article.isAdmin && (this.$state.current.name === 'article');
        this.isShowUpdateArticleForm = false;

        this.updateArticle = this.updateArticle.bind(this);
    }

    // TODO to servis
    setVote(article, direction) {
        let that = this;
        let url = this.urlConfig.getVoteArticleUrl(article.articleId, direction);
        let promiseResponse = this.requestsService.putRequest(url);
        promiseResponse
            .then((res) => {
                article.rating += direction == "up" ? 1 : -1;
                that.toastr.success('Your voice was accepted!');
                article.isVoted = false;
                // that.$scope.$digest();
            })
            .catch(() => {
                that.toastr.error('You already voted!');
            })
    }

    deleteArticle() {
        debugger
        let that = this;
        let url = this.urlConfig.getDeleteArticleUrl(this.article.articleId)
        let response = this.requestsService.deleteData(url);
        response
            .then((res) => {
                that.toastr.success('Article is deleted!');
                that.$state.go('user.posts', {username: that.article.author})
            })
            .catch(() => {
                that.toastr.error('Server Err');
            })
    }

    updateArticle(data) {
        debugger;
        let that = this;
        let url = this.urlConfig.getUpdateArticleUrl(this.article.articleId)
        let response = this.requestsService.putData(url, data);
        response
            .then((res) => {
                that.toastr.success('You article is updated');
                that.isShowUpdateArticleForm = false;
                that.article.title = data.title;
                that.article.link = data.link;
            })
            .catch((data) => that.toastr.error('Sorry. Server Error'))
    }

    closeShowUpdateArticleForm() {
        this.isShowUpdateArticleForm = false;
    }




}

ArticleInfoController.$inject = ['$state', 'toastr', '$scope', 'requestsService', 'urlConfig'];

export default ArticleInfoController;
