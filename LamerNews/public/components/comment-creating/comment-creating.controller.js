class CommentCreatingController {

    constructor(userIdentification) {
        this.userIdentification = userIdentification;
        this.addComment = this.addComment();
    }

}
CommentCreatingController.$inject = ['userIdentification'];

export default CommentCreatingController;
