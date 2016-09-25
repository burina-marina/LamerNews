import './article-info.css';
import ArticleInfoController from './article-info.controller';

class ArticleInfoComponent {
    constructor() {

        this.templateUrl = 'components/article-info/article-info.tpl.html';
        this.controller = ArticleInfoController;
        this.bindings = {
            article: '='
        }
    }
}

export default ArticleInfoComponent;