class UrlConfigService {
    constructor() {

        this.createUserUrl = "http://localhost:3001/app/user/create";
        this.authenticateUserUrl = "http://localhost:3001/app/user/authenticate";
        this.createArticleUrl = "http://localhost:3001/app/submit/article";
        this.userUrl = "http://localhost:3001/app/user/info";
        this.checkAuthorization = "http://localhost:3001/app/user/checkautorization"
    }

    getNewsListUrl(state, listSet) {
        if (state.name == "newsBlock" || state.name == "newsBlock.details") {
            return `http://localhost:3001/app/article/${state.params.type}/${listSet}`
        } else {
            return `http://localhost:3001/app/user/info/${state.params.username}/posts/${listSet}`;
        }
    }


    getUpdateArticleUrl(id) {
        return `http://localhost:3001/app/admin/article/${id}`;
    }

    getDeleteArticleUrl(id) {
        return `http://localhost:3001/app/admin/article/${id}`;
    }


    getTopArticleUrl(page) {
        return `http://localhost:3001/app/article/top/${page}`;
    }

    getLatestArticleUrl(page) {
        return `http://localhost:3001/app/article/latest/${page}`;
    }


    getVoteArticleUrl(id, state) {
        return `http://localhost:3001/app/vote/article/${id}/${state}`;
    }



    getUserUrl(username) {
        return `http://localhost:3001/app/user/info/${username}`;
    }

    getUserPasswordUrl(username) {
        return `http://localhost:3001/app/user/info/${username}/password`;
    }

    getUserEmailUrl(username) {
        return `http://localhost:3001/app/user/info/${username}/email`;
    }

    // getUserPostsUrl(username, page) {
    //
    // }

    getUserCommentsUrl(username) {
        return `http://localhost:3001/app/user/info/${username}/comments`;
    }





    getArticleDetailsUrl(articleId) {
        return `http://localhost:3001/app/article/about/${articleId}/comments`;
    }
    getArticleUrl(articleId) {
        return `http://localhost:3001/app/article/about/${articleId}`;
    }
    getUserPhotoUrl(username) {
        return `http://localhost:3001/app/user/${username}/photo`;
    }
    getCreateCommentUrl(articleId) {
        return `http://localhost:3001/app/comment/add/to/${articleId}`;
    }
    getDeleteCommentUrl(commentId) {
        return `http://localhost:3001/app/comment/delete/${commentId}`;
    }
}

export default UrlConfigService;