class NewsBlockService {

    constructor($state, urlConfig) {
        this.$state = $state;
        this.isNewsBlockState = this.$state.current.name === 'blockState'; 

        this.preview = {
            isActive: false,
            article: {}
        }
    }

    showDetails(article) {
        this.preview = {
            isActive: true,
            article: article
        }
        this.$state.go('newsBlock.details', {id: article.articleId})
    }

    hideDetails() {
        this.preview.isActive = false;
    }

}

NewsBlockService.$inject = ['$state', 'urlConfig'];

export default NewsBlockService;
