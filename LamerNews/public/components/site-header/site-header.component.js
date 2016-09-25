import './site-header.css';
import SiteHeaderController from './site-header.controller';

class SiteHeaderComponent {
    constructor() {
        this.templateUrl = 'components/site-header/site-header.tpl.html';
        this.controller = SiteHeaderController;
    }
}

export default SiteHeaderComponent;
