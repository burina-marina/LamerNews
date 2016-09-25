// class NewsArticleService {
//
//     constructor(identification, urlConfig) {
//         this.identification = identification;
//         this.urlConfig = urlConfig;
//     }
//
//     getRequestParams() {
//         return {
//             method: "PUT",
//             headers: this.identification.token ? {'x-access-token': this.identification.token} : {}
//         }
//     }
//
//     changeRating(id, direction) {
//         return fetch(this.urlConfig.getVoteArticleUrl(id, direction), this.getRequestParams())
//             .then((res) => {
//                 if (res.status === 200 || res.status === 304 ) {
//                     return res.json()
//                 } else {
//                     return res.json().then(Promise.reject.bind(Promise));
//                 }
//             })
//     }
// }
//
// NewsArticleService.$inject = ['identification', 'urlConfig'];
//
// export default NewsArticleService;
