import './authorize.css';
import AuthorizeController from './authorize.controller';

class AuthorizeComponent {
    constructor() {
        this.templateUrl = 'components/authorize/authorize.tpl.html';
        this.controller = AuthorizeController;
    }
}

export default AuthorizeComponent;
