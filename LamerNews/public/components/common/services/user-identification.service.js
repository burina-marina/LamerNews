/**
 * Created by burin on 01.07.2016.
 */
class UserIdentificationService {
    constructor() {
        this.isAuthorized = false;
        this.token = localStorage.token;
        this.username = localStorage.username;
        this.userPhoto = localStorage.userPhoto;
    }

    setUser(info) {
        this.isAuthorized = info.isAuthorized;
        this.userPhoto = localStorage.userPhoto = info.userPhoto;
        this.token = localStorage.token = info.token;
        this.username = localStorage.username = info.username;
    }

    delUser() {
        delete localStorage.token;
        delete localStorage.username;
        delete localStorage.userPhoto;

        this.isAuthorized = false;
        this.token = localStorage.token;
        this.username = localStorage.username;
        this.userPhoto = localStorage.userPhoto;
    }

}

export default UserIdentificationService;