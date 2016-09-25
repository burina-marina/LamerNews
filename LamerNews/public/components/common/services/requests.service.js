class RequestsService {

    constructor(userIdentification) {
        this.userIdentification = userIdentification;

    }

    fetchData(url) {
        var requestParams = {
            method: 'GET',
            headers: this.userIdentification.token ? { 'x-access-token': this.userIdentification.token } : {}
        };

        return fetch(url, requestParams)
            .then((response) => response.json())
            .catch(() => {
                // console.log(response)
            })
            .then((response) => {
                return response;
            })
    }

    postData(url, body) {
        let requestParams = {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.userIdentification.token
            })
        }

        return fetch(url, requestParams)
            .then((res) => {
                if (res.status === 200 || res.status === 304) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }

    putRequest(url) {
        var requestParams = {
            method: "PUT",
            headers: this.userIdentification.token ? { 'x-access-token': this.userIdentification.token } : {}
        };

        return fetch(url, requestParams)
            .then((res) => {
                if (res.status === 200 || res.status === 304) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }


    deleteData(url) {
        var requestParams = {
            method: "DELETE",
            headers: new Headers({
                'x-access-token': this.userIdentification.token
            })
        }
        return fetch(url, requestParams)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }

    putData(url, body) {
        var requestParams = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.userIdentification.token
            })
        }

        return fetch(url, requestParams)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
    }


    autorizeRequest(url, body) {
        var requestParams = {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        let that = this;
        return fetch(url, requestParams)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return res.json().then(Promise.reject.bind(Promise));
                }
            })
            .then((data) => {
                that.userIdentification.setUser(data);

            })
    }


}

RequestsService.$inject = ['userIdentification'];

export default RequestsService;