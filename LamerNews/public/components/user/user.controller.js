class UserController {

    constructor(userIdentification, $state, $scope) {
        this.$scope = $scope;
        this.userIdentification = userIdentification;
        this.$state = $state;
    }

    $onInit() {

    }

}

UserController.$inject = ['userIdentification', '$state', '$scope'];

export default UserController;
