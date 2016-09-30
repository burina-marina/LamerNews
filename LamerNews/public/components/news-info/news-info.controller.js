class NewsInfoController {

    constructor($state, newsBlockService) {
        this.$state = $state;
        this.newsBlockService = newsBlockService;
        this.isShowControlPanel = this.article.isAdmin && (this.$state.current.name === 'article');
        this.isUpdateState = false;
    }


}

NewsInfoController.$inject = ['$state', 'newsBlockService'];

export default NewsInfoController;