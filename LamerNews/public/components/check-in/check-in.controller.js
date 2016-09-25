class CheckInController {

    constructor($scope, authorizeService) {
        this.authorizeService = authorizeService;
        this.$scope = $scope;
        this.fieldValid = {
            username: true,
            email: true
        };

        this.notification = '';
        this.data = {};
    }

    formSubmit() {
        let that = this;
        let response = this.authorizeService.checkIn(this.data);
        response
            .catch((data) => {
                if (data.status === '409') {
                    that.checkIn.$setPristine();
                    that.notification = '';
                    that.fieldValid.username = true;
                    that.fieldValid.email = true;
                    that.fieldValid[data.message] = false;
                } else {
                    that.notification = 'Server error. Try again';
                }
            })
    }

}

CheckInController.$inject = ['$scope', 'authorizeService'];

export default CheckInController;
