class UrlConfigService {
    constructor() {
        this.origin = window.location.origin;
        this.createUserUrl = `${this.origin}/app/user/create`;
        this.authenticateUserUrl = `${this.origin}/app/user/authenticate`;
        this.createArticleUrl = `${this.origin}/app/submit/article`;
        this.userUrl = `${this.origin}/app/user/info`;
        this.checkAuthorization = `${this.origin}/app/user/checkautorization`;
    }

    getNewsListUrl(state, listSet) {
        if (state.name == "newsBlock" || state.name == "newsBlock.details") {
            return `${this.origin}/app/article/${state.params.type}/${listSet}`
        } else {
            return `${this.origin}/app/user/info/${state.params.username}/posts/${listSet}`;
        }
    }

    getArticleTitleUrl(id) {
        return `${this.origin}/app/admin/article/${id}`;
    }

    getUpdateArticleUrl(id) {
        return `${this.origin}/app/admin/article/${id}`;
    }

    getDeleteArticleUrl(id) {
        return `${this.origin}/app/admin/article/${id}`;
    }


    getTopArticleUrl(page) {
        return `${this.origin}/app/article/top/${page}`;
    }

    getLatestArticleUrl(page) {
        return `${this.origin}/app/article/latest/${page}`;
    }


    getVoteArticleUrl(id, state) {
        return `${this.origin}/app/vote/article/${id}/${state}`;
    }



    getUserUrl(username) {
        return `${this.origin}/app/user/info/${username}`;
    }

    getUserPasswordUrl(username) {
        return `${this.origin}/app/user/info/${username}/password`;
    }

    getUserEmailUrl(username) {
        return `${this.origin}/app/user/info/${username}/email`;
    }

    // getUserPostsUrl(username, page) {
    //
    // }

    getUserCommentsUrl(username) {
        return `${this.origin}/app/user/info/${username}/comments`;
    }





    getArticleDetailsUrl(articleId) {
        return `${this.origin}/app/article/about/${articleId}/comments`;
    }
    getArticleUrl(articleId) {
        return `${this.origin}/app/article/about/${articleId}`;
    }
    getUserPhotoUrl(username) {
        return `${this.origin}/app/user/${username}/photo`;
    }
    getCreateCommentUrl(articleId) {
        return `${this.origin}/app/comment/add/to/${articleId}`;
    }
    getDeleteCommentUrl(commentId) {
        return `${this.origin}/app/comment/delete/${commentId}`;
    }
}

export default UrlConfigService;