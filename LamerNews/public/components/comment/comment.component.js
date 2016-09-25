import './comment.css';
import CommentController from './comment.controller';

class CommentComponent {

    constructor() {
        this.templateUrl = 'components/comment/comment.tpl.html';
        this.controller = CommentController;
        this.bindings = {
            comment: '=comment',
            deleteComment: '&deleteComment'
        }
    }
}

export default CommentComponent;
