import './comment-creating.css';
import CommentCreatingController from './comment-creating.controller';

class CommentCreatingComponent {

    constructor() {
        this.templateUrl = 'components/comment-creating/comment-creating.tpl.html';
        this.bindings = {
            addComment: '&addComment'
        },
        this.controller = CommentCreatingController;

    }
}

export default CommentCreatingComponent;
