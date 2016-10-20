class NewsDetailsController {

    constructor($state, toastr, $scope, requestsService, urlConfig, userIdentification, newsBlockService) {
        // commentsArr
        this.$state = $state;
        this.toastr = toastr;
        this.$scope = $scope;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.userIdentification = userIdentification;
        this.newsBlockService = newsBlockService;

        this.addComment = this.addComment.bind(this);
        this.isEmptyCommentsArr = this.commentsArr.length == 0;
    }

    closeDetails() {
        this.article.isActive = false;
        this.$state.go('newsBlock', { type: this.$state.params.type })
    }

    returnBack() {
        if (this.newsBlockService.prevState.name) {
            this.$state.go(this.newsBlockService.prevState.name, this.newsBlockService.prevState.params);
            this.newsBlockService.prevState.name = null;
            this.newsBlockService.prevState.params = null;
        } else {
            this.$state.go('user', { username: this.article.author });
        }


    }

    addComment(commentData) {
        let that = this;
        let url = this.urlConfig.getCreateCommentUrl(this.article.articleId);
        let response = this.requestsService.postData(url, commentData)
        response
            .then((response) => {
                that.toastr.success('Comment is created');
                that.commentsArr.unshift({
                    commentId: response.commentId,
                    commentBody: response.commentBody,
                    postedDate: response.postedDate,
                    authorName: that.userIdentification.username,
                    authorPhoto: that.userIdentification.userPhoto,
                    isAdmin: true
                });

                that.article.commentCount += 1;
                commentData.comment_body = '';
                that.isEmptyCommentsArr = that.commentsArr.length == 0;
                that.$scope.$digest();
            })
            .catch(() => {
                that.toastr.error('server error');
            })
    }

}

NewsDetailsController.$inject = ['$state', 'toastr', '$scope', 'requestsService', 'urlConfig', 'userIdentification', 'newsBlockService'];

export default NewsDetailsController;