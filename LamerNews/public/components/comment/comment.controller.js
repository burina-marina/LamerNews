class CommentController {

    constructor(handlerService, $state) {
        this.deleteComment = this.deleteComment();
        this.handlerService = handlerService;
        this.$state = $state;
    }

}
CommentController.$inject = ['handlerService', '$state'];

export default CommentController;