class UserInfoService {
    
    constructor(identification, $state, urlConfig) {
        this.identification = identification;
        this.$state = $state;
        this.urlConfig = urlConfig;
    }

    getRequestParams(body) {
        var headers;
        if (this.identification.token) {
            headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.identification.token
            });
        } else {
            headers = new Headers({
                'Content-Type': 'application/json'
            });
        }
        return {
            method: "PUT",
            body: JSON.stringify(body),
            headers: headers
        }
    }

    updateUserPassword(username, body) {
        return fetch(this.urlConfig.getUserPasswordUrl(username), this.getRequestParams(body))
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }

    updateUserEmail(username, body) {
        return fetch(this.urlConfig.getUserEmailUrl(username), this.getRequestParams(body))
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }
    
}

UserInfoService.$inject = ['identification', '$state', 'urlConfig'];
export default UserInfoService;