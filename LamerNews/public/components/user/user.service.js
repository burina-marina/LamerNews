// class UserService {
//
//     constructor(identification, $state, urlConfig) {
//         this.identification = identification;
//         this.$state = $state;
//         this.urlConfig = urlConfig;
//     }
//
//     getUser(url) {
//         var requestParams = {
//             method: 'GET',
//             headers: this.identification.token ? {'x-access-token': this.identification.token} : {}
//         };
//
//         return fetch(url, requestParams)
//             .then((res) => {
//                 if (res.status === 200) {
//                     return res.json()
//                 } else {
//                     return res.json().then(Promise.reject.bind(Promise));
//                 }
//             })
//             .then((res) => {
//                 return res;
//             });
//     }
//
//     getUserActivity(url) {
//         var requestParams = {
//             method: 'GET',
//             headers: this.identification.token ? {'x-access-token': this.identification.token} : {}
//         };
//
//         return fetch(url, requestParams)
//             .then((response) => {
//                 if (response.status === 200) {
//                     return response.json()
//                 } else {
//                     return response.json().then(Promise.reject.bind(Promise));
//                 }
//             })
//             .then((response) => {
//                 return response;
//             });
//     }
//
// }
//
// UserService.$inject = ['identification', '$state', 'urlConfig'];
// export default UserService;
