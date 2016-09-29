class NewsBlockService {

    constructor($state, toastr, urlConfig, requestsService) {
        this.$state = $state;
        this.toastr = toastr;
        this.urlConfig = urlConfig;
        // this.isNewsBlockState = this.$state.current.name === 'blockState'; 
        this.requestsService = requestsService;

        this.preview = {
            isActive: false,
            article: {}
        }
    }

    showDetails(article) {
        this.preview = {
            isActive: true,
            article: article
        }
        this.$state.go('newsBlock.details', { id: article.articleId })
    }

    hideDetails() {
        this.preview.isActive = false;
    }

    deleteArticle(article) {
        let that = this;
        let url = this.urlConfig.getDeleteArticleUrl(article.articleId)
        let response = this.requestsService.deleteData(url);
        response
            .then((res) => {
                that.toastr.success('Article is deleted!');
                if (that.$state.current.name !== 'article') {
                    let state = that.$state.current.name.split('.')[0];
                    for (let key in article) {
                        delete article[key];
                    }
                    that.$state.go(state);
                }
            })
            .catch(() => {
                that.toastr.error('Server Err');
            })
    }

    updateArticle(article, data) {
        let that = this;
        let url = this.urlConfig.getUpdateArticleUrl(article.articleId)
        let response = this.requestsService.putData(url, data);
        response
            .then((res) => {
                that.toastr.success('You article is updated');
                article.title = data.title;
                article.link = data.link;
            })
            .catch((data) => that.toastr.error('Sorry. Server Error'))
    }

    setVote(article, direction) {
        let that = this;
        let url = this.urlConfig.getVoteArticleUrl(article.articleId, direction);
        let promiseResponse = this.requestsService.putRequest(url);
        promiseResponse
            .then((res) => {
                article.rating += direction == "up" ? 1 : -1;
                that.toastr.success('Your voice was accepted!');
                article.isVoted = false;
            })
            .catch(() => {
                that.toastr.error('You already voted!');
            })
    }

}

NewsBlockService.$inject = ['$state', 'toastr', 'urlConfig', 'requestsService'];

export default NewsBlockService;