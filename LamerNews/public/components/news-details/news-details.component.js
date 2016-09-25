import './news-details.css';
import NewsDetailsController from './news-details.controller';

class NewsDetailsComponent {
    constructor() {
        this.templateUrl = 'components/news-details/news-details.tpl.html';
        this.controller = NewsDetailsController;
        this.bindings = {
            article: '=',
            commentsArr: "<"
        }
    }
}

export default NewsDetailsComponent;
