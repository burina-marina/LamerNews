class CommentsListController {

    constructor(toastr, $scope, requestsService, urlConfig) {
        // commentsArr
        // bindingPlace
        this.$scope  = $scope;
        this.toastr = toastr;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment(commentId) {
        let that = this;
        let url = this.urlConfig.getDeleteCommentUrl(commentId);
        let response = this.requestsService.deleteData(url)
        .then(() => {
            that.bindingPlace.commentCount -=1;
            let commentIndex = that.commentsArr.findIndex((el) => el.commentId === commentId);
            that.commentsArr.splice(commentIndex, 1);
            that.toastr.success("Comments is deleted");
        })
        .catch(() => {
            that.toastr.error("Server Err!!")
        })
    }
}

CommentsListController.$inject = ['toastr', '$scope', 'requestsService', 'urlConfig'];

export default CommentsListController;
