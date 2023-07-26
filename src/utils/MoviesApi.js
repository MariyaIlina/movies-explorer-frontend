class MoviesApi {
  constructor() {
    this.MOVIES_BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";
  }

  checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  getMovies (){
  return fetch(this.MOVIES_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    
    },
  }).then((res) => this.checkResponse(res));
}
}
  const moviesApi = new MoviesApi();

export default moviesApi;

// const MOVIES_BASE_URL = " https://api.nomoreparties.co/beatfilm-movies";

// export const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(res.status);
// };

// export const getMovies = () => {
//   return fetch(`${MOVIES_BASE_URL}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => checkResponse(res));
// }