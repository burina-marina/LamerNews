logOut() {
    this.identification.delUser();
    debugger;
    if (this.$state.current.name === 'top') {
        this.$state.reload('top');
    } else {
        this.$state.go('top', {page: '1'});
    }
}
