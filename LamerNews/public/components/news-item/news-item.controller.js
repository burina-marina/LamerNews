class NewsItemController {

    constructor(toastr, $scope, handlerService, $state, newsBlockService) {
        // article;
        // setVote
        this.newsBlockService = newsBlockService;
        this.setVote = this.setVote();
        this.$scope  = $scope;
        this.$state = $state;
        this.toastr = toastr;
        // this.newsInfoService = newsInfoService;
        this.handlerService = handlerService;

        this.setArticleActiveState = this.setArticleActiveState();
        // debugger
    }

    $onInit() {
        this.article.postedDate = this.handlerService.timespanToHumanString(this.article.postedDate);
        if (this.$state.current.name == "newsBlock.details") {
            if (this.article.articleId === this.newsBlockService.preview.article.articleId) {
                this.article.authorPhoto = this.newsBlockService.preview.article.authorPhoto;
                this.newsBlockService.preview.article  = this.article;
                this.article.isActive = true;
            }
        }
    }

    showDetails() {
        this.setArticleActiveState(this.article);
        this.newsBlockService.showDetails(this.article)
    }

    // showDetails() {
    //     debugger
    // }

}
NewsItemController.$inject = ['toastr', '$scope', 'handlerService', '$state', 'newsBlockService'];

export default NewsItemController;
