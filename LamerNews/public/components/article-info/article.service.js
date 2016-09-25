class ArticleService {

    constructor(identification, $state, urlConfig) {
        this.identification = identification;
        this.$state = $state;
        this.urlConfig = urlConfig;
    }

    getPutRequestParams(body) {
        return {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.identification.token
            })
        }
    }

    getCreateRequestParams(body) {
        return {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.identification.token
            })
        }
    }

    getDeleteRequestParams() {
        return {
            method: "DELETE",
            headers: new Headers({
                'x-access-token': this.identification.token
            })
        }
    }

    deleteArticle(articleId) {
        return fetch(this.urlConfig.getDeleteArticleUrl(articleId), this.getDeleteRequestParams())
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }

    createArticle(body) {
        return fetch(this.urlConfig.createArticleUrl, this.getCreateRequestParams(body))
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }

    updateArticle(articleId, body) {

        return fetch(this.urlConfig.getUpdateArticleUrl(articleId), this.getPutRequestParams(body))
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }
}

ArticleService.$inject = ['identification', '$state', 'urlConfig'];
export default ArticleService;
