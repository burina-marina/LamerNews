import './updating-article.css';
import UpdatingArticleController from './updating-article.controller';

class UpdatingArticleComponent {

    constructor() {
        this.templateUrl = 'components/updating-article/updating-article.tpl.html';
        this.controller = UpdatingArticleController;
        this.bindings = {
            article: '=article',
            closeForm: '&closeForm',
            updateArticle: '&updateArticle'
        };
    }
}

export default UpdatingArticleComponent;
