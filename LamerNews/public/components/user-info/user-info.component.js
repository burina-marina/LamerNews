import './user-info.css';
import UserInfoController from './user-info.controller';


class UserInfoComponent {
    constructor() {
        this.templateUrl = 'components/user-info/user-info.tpl.html';
        this.controller = UserInfoController;
        this.bindings = {
            serverUserInfo: '=serverUserInfo'
        }
    }
}

export default UserInfoComponent;
