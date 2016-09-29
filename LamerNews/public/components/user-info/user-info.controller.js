class UserInfoController {

    constructor($state, $scope, toastr, handlerService, requestsService, urlConfig) {
        this.handlerService = handlerService;
        this.requestsService = requestsService;
        this.urlConfig = urlConfig;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;

        this.isEditInfoState = false;
        this.editInfoButton = 'Edit information';
    }

    editInfoState() {
        this.isEditInfoState = !this.isEditInfoState;
        this.editInfoButton = this.isEditInfoState ? "Show Information" : "Edit Information";
    }

    changePassword() {
        var that = this;
        let url = this.urlConfig.getUserPasswordUrl(this.serverUserInfo.user.username);
        let response = this.requestsService.putData(url, this.password);
        response
            .then(() => {
                that.toastr.success('Password updated successful');
                that.password.oldPassword = '';
                that.password.newPassword = '';
                that.changePasswordForm.$setPristine();
            })
            .catch(() => {
                that.toastr.error('You entered wrong old password!');
            })
    }

    changeEmail() {
        var that = this;
        let url = this.urlConfig.getUserEmailUrl(this.serverUserInfo.user.username);
        let response = this.requestsService.putData(url, this.email);
        response
            .then((res) => {
                that.toastr.success('Email updated successful');
                that.serverUserInfo.user.email = that.email.email;
                that.serverUserInfo.user.avatar = res.avatar;
                that.email.email = '';
                that.changeEmailForm.$setPristine();

                that.$scope.$apply();
            })
            .catch(() => {
                that.toastr.error('You entered wrong old password!');
            })
    }


}

UserInfoController.$inject = ['$state', '$scope', 'toastr', 'handlerService', 'requestsService', 'urlConfig'];

export default UserInfoController;