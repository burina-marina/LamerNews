class NewsListController {

    constructor(urlConfig, requestsService, $scope, $state, toastr) {

        this.urlConfig = urlConfig;
        this.requestsService = requestsService;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;

        this.newsListSet = {
            current: 0,
            state: {
                name: this.$state.current.name,
                params: this.$state.params
            },
            isNext: false
        }

        this.newsArr = [];
        this.setVote = this.setVote.bind(this);

        this.setArticleActiveState = this.setArticleActiveState.bind(this);

    }

    $onInit() {
        this.getNewNewsSet();
    }

    getNewNewsSet() {
        let that = this;

        let url = this.urlConfig.getNewsListUrl(this.newsListSet.state, this.newsListSet.current+1);
        let promiseResponse = this.requestsService.fetchData(url);

        promiseResponse.then((serverData) => {
            // serverData = {arrLength, articleArr}
            that.newsListSet.current +=1;
            that.newsListSet.isNext = that.newsListSet.current*10 < serverData.arrLength;

            for (let article of serverData.articlesArr) {
                that.newsArr.push(article);
            }
            that.$scope.$digest();
        })
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
                // that.$scope.$digest();
            })
            .catch(() => {
                that.toastr.error('You already voted!');
            })
    }

    setArticleActiveState(article) {
        for (let articleElement of this.newsArr) {
            if (articleElement.articleId === article.articleId) {
                article.isActive = true
            } else {
                if (articleElement.isActive) {
                    articleElement.isActive = false;
                }
            }
        }
    }

}

NewsListController.$inject = ['urlConfig', 'requestsService', '$scope', '$state','toastr'];

export default NewsListController;
