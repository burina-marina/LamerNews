import './user.css';
import UserController from './user.controller';


class UserComponent {
    constructor() {
        this.templateUrl = 'components/user/user.tpl.html';
        this.controller = UserController;
        this.bindings = {
            serverUserInfo: '<serverUserInfo'
        }
    }
}

export default UserComponent;
