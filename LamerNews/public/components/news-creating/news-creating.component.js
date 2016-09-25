import './news-creating.css';
import NewsCreatingController from './news-creating.controller';

class NewsCreatingComponent {

    constructor() {
        this.templateUrl = 'components/news-creating/news-creating.tpl.html';
        this.controller = NewsCreatingController;
    }
}

export default NewsCreatingComponent;
