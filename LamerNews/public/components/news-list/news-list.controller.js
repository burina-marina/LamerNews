class NewsListController {

    constructor(urlConfig, requestsService, $scope, $state, toastr, newsBlockService, $element, UIHelper) {

        this.urlConfig = urlConfig;
        this.requestsService = requestsService;
        this.newsBlockService = newsBlockService;
        this.$scope = $scope;
        this.$state = $state;
        this.$element = $element;
        this.UIHelper = UIHelper;
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
        this.setArticleActiveState = this.setArticleActiveState.bind(this);

    }

    $onInit() {
        this.getNewNewsSet();
    }
    
    $postLink() {
        if (this.UIHelper.isDesktopSize) {
            var k = this.$element;
            Ps.initialize(k[0]);
            Ps.update(k[0]);
        }
    }

    getNewNewsSet() {
        let that = this;

        let url = this.urlConfig.getNewsListUrl(this.newsListSet.state, this.newsListSet.current + 1);
        let promiseResponse = this.requestsService.fetchData(url);

        promiseResponse.then((serverData) => {
            // serverData = {arrLength, articleArr}
            that.newsListSet.current += 1;
            that.newsListSet.isNext = that.newsListSet.current * 10 < serverData.arrLength;

            for (let article of serverData.articlesArr) {
                if (that.newsBlockService.preview.article.articleId === article.articleId) {
                    that.newsArr.push(that.newsBlockService.preview.article);
                } else {
                    that.newsArr.push(article);
                }
            }
            that.$scope.$digest();
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

NewsListController.$inject = ['urlConfig', 'requestsService', '$scope', '$state', 'toastr', 'newsBlockService', '$element', 'UIHelper'];

export default NewsListController;