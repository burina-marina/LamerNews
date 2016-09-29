import './news-info.css';
import NewsInfoController from './news-info.controller';

class NewsInfoComponent {
    constructor() {

        this.templateUrl = 'components/news-info/news-info.tpl.html';
        this.controller = NewsInfoController;
        this.bindings = {
            article: '='
        }
    }
}

export default NewsInfoComponent;