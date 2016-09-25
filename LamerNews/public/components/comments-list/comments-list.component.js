import './comments-list.css';
import CommentsListController from './comments-list.controller';

class CommentsListComponent {
    constructor() {

        this.templateUrl = 'components/comments-list/comments-list.tpl.html';
        this.controller = CommentsListController;
        this.bindings = {
            commentsArr: '=commentsArr',
            bindingPlace: '=bindingPlace'
        }
    }
}

export default CommentsListComponent;
