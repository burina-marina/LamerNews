class NewsUpdatingController {

    constructor($state, newsBlockService) {
        this.$state = $state;
        this.newsBlockService = newsBlockService;
        this.data = {
            title: this.article.title,
            link: this.article.link
        };
    }

    closeForm() {
        if (this.state.url) {
            this.$state.go(this.state.url, this.state.param);
        } else {
            this.$state.go("newsBlock", { type: 'top' });
        }
    }

    updateArticle() {
        this.newsBlockService.updateArticle(this.article, this.data);
        this.closeForm();
    }

    deleteArticle() {
        this.newsBlockService.deleteArticle(this.article);
        this.closeForm();
    }
}
NewsUpdatingController.$inject = ['$state', 'newsBlockService'];

export default NewsUpdatingController;