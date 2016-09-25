class LogInController {

    constructor($scope, authorizeService) {
        this.$scope = $scope;
        this.authorizeService = authorizeService;
        this.notification = '';
        this.data = {};
    }

    formSubmit() {
        let that = this;
        let promiseResponse = this.authorizeService.logIn(this.data);
        promiseResponse
            .catch((data) => {
                that.notification = (data.status === '401')
                    ? 'Please check that you have entered your login and password correctly'
                    : 'Server error. Please try again';
                that.$scope.$digest();
            });
    }
}

LogInController.$inject = ['$scope', 'authorizeService'];

export default LogInController;
