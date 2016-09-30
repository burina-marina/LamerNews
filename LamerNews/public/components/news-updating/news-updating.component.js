import './news-updating.css';
import NewsUpdatingController from './news-updating.controller';

class NewsUpdatingComponent {

    constructor() {
        this.templateUrl = 'components/news-updating/news-updating.tpl.html';
        this.controller = NewsUpdatingController;
        this.bindings = {
            isUpdateState: '=isUpdateState',
            article: '=article'
        };
    }
}

export default NewsUpdatingComponent;