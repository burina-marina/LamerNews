class NewsUpdatingController {

    constructor(newsBlockService) {
        this.newsBlockService = newsBlockService;
        this.data = {
            title: this.article.title,
            link: this.article.link
        };
    }
    $onInit() {
        if (!this.prevState.url) {
            this.prevState.url = 'newsBlock';
            this.prevState.param = {
                type: 'top'
            }
        }
    }
}
NewsUpdatingController.$inject = ['newsBlockService'];

export default NewsUpdatingController;