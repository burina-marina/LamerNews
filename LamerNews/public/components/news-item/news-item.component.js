import './news-item.css';
import NewsItemController from './news-item.controller';

class NewsItemComponent {

    constructor() {
        this.templateUrl = 'components/news-item/news-item.tpl.html';
        this.bindings = {
            article: '=article',
            setArticleActiveState: '&setArticleActiveState'
        },
        this.controller = NewsItemController;

    }
}

export default NewsItemComponent;