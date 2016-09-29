class NewsBlockController {

    constructor($state, newsBlockService) {
        this.$state = $state;
        this.newsBlockService = newsBlockService;
        this.newsBlockService.newsListType = $state.params.type;
        // this.serverData {arrLength, articlesArr}
        // TODO: check to correct type of news-list
    }

}

NewsBlockController.$inject = ['$state', 'newsBlockService'];

export default NewsBlockController;