class CommentsListController {

    constructor(toastr, $scope, $state, requestsService, urlConfig, $element) {
        // commentsArr
        // bindingPlace
        this.$state = $state;
        this.$scope = $scope;
        this.toastr = toastr;
        this.$element = $element;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.deleteComment = this.deleteComment.bind(this);
    }

    $onInit() {
        if (this.$state.current.name === 'user.comments') {
            for (let item of this.commentsArr) {
                item.authorName = this.bindingPlace.username;
                item.authorPhoto = this.bindingPlace.avatar;
            }
        }
    }

    $postLink() {
        var k = this.$element;
        Ps.initialize(k[0], {
            scrollXMarginOffset: 100,
            scrollYMarginOffset: 100
        });
        Ps.update(k[0]);
    }

    deleteComment(commentId) {
        let that = this;
        let url = this.urlConfig.getDeleteCommentUrl(commentId);
        let response = this.requestsService.deleteData(url)
            .then(() => {
                that.bindingPlace.commentCount -= 1;
                let commentIndex = that.commentsArr.findIndex((el) => el.commentId === commentId);
                that.commentsArr.splice(commentIndex, 1);
                that.toastr.success("Comments is deleted");
            })
            .catch(() => {
                that.toastr.error("Server Err!!")
            })
    }

    getNewCommentsSet() {
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


}

CommentsListController.$inject = ['toastr', '$scope', '$state', 'requestsService', 'urlConfig', '$element'];

export default CommentsListController;