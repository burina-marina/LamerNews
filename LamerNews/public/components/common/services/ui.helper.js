class UIHelper {

    constructor($document) {
        this.$document = $document;
        this.isDesktopSize = this.$document.find('body')[0].clientWidth > 1000
    }

}
UIHelper.$inject = ['$document'];
export default UIHelper;