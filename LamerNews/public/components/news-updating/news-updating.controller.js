class NewsUpdatingController {

    constructor(newsBlockService) {
        debugger;
        this.newsBlockService = newsBlockService;
        this.data = {
            title: this.article.title,
            link: this.article.link
        };
    }
}
NewsUpdatingController.$inject = ['newsBlockService'];

export default NewsUpdatingController;