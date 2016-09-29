class NewsInfoController {

    constructor($state, newsBlockService) {
        this.$state = $state;
        this.newsBlockService = newsBlockService;
        debugger
        this.isShowControlPanel = this.article.isAdmin && (this.$state.current.name === 'newsBlock.details');
    }

}

NewsInfoController.$inject = ['$state', 'newsBlockService'];

export default NewsInfoController;