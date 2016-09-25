import './news-list.css';
import NewsListController from './news-list.controller';

class NewsListComponent {
    constructor() {
        this.templateUrl = 'components/news-list/news-list.tpl.html';
        this.controller = NewsListController;
    }
}

export default NewsListComponent;
