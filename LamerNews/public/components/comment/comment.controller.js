
class CommentController {

    constructor(handlerService) {
        this.deleteComment = this.deleteComment();
        this.handlerService = handlerService;
    }

}
CommentController.$inject = ['handlerService'];

export default CommentController;
