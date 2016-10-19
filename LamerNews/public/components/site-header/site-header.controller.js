class SiteHeaderController {

    constructor(userIdentification, authorizeService, $element) {
        this.userIdentification = userIdentification;
        this.authorizeService = authorizeService;
        this.$element = $element;
    }

    $onInit() {
        this.authorizeService.checkAuthorization();
    }

    changeView() {
        let triggerButton = this.$element.find('span');
        document.body.appendChild()

    }

}

SiteHeaderController.$inject = ['userIdentification', 'authorizeService', '$element'];

export default SiteHeaderController;