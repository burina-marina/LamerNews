import './news-block.css';
import NewsBlockController from './news-block.controller';

class NewsBlockComponent {
    constructor() {
        this.templateUrl = 'components/news-block/news-block.tpl.html';
        this.controller = NewsBlockController;
    }
}

export default NewsBlockComponent;
