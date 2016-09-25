class SiteHeaderController {

    constructor(userIdentification, authorizeService) {
        this.userIdentification = userIdentification;
        this.authorizeService = authorizeService;
    }

    $onInit() {
        this.authorizeService.checkAuthorization();
    }

}

SiteHeaderController.$inject = ['userIdentification', 'authorizeService'];

export default SiteHeaderController;
