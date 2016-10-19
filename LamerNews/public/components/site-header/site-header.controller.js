class SiteHeaderController {

    constructor(userIdentification, authorizeService, $element, $document) {
        this.userIdentification = userIdentification;
        this.authorizeService = authorizeService;
        this.$element = $element;
        this.$document = $document;
    }

    $onInit() {
        this.authorizeService.checkAuthorization();
    }

    toggleMenuVisibility() {
        this.$document.find('body').toggleClass('unactive');
        this.$element.toggleClass('openMenu');
    }

}

SiteHeaderController.$inject = ['userIdentification', 'authorizeService', '$element', '$document'];

export default SiteHeaderController;