class NewsItemController {

    constructor(toastr, $scope, handlerService, $state, newsBlockService) {
        // article;
        // setVote
        this.newsBlockService = newsBlockService;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.handlerService = handlerService;
        this.setArticleActiveState = this.setArticleActiveState();
    }

    $onInit() {
        this.article.postedDate = this.handlerService.timespanToHumanString(this.article.postedDate);
        if (this.$state.current.name == "newsBlock.details") {
            if (this.article.articleId === this.newsBlockService.preview.article.articleId) {
                this.article.authorPhoto = this.newsBlockService.preview.article.authorPhoto;
                this.newsBlockService.preview.article = this.article;
                this.article.isActive = true;
            }
        } else {
            this.article.isActive = false;
        }
    }

    showDetails() {
        this.setArticleActiveState(this.article);
        this.newsBlockService.showDetails(this.article)
    }

}
NewsItemController.$inject = ['toastr', '$scope', 'handlerService', '$state', 'newsBlockService'];

export default NewsItemController;