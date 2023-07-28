class MainApi {
  constructor(options) {
    this.MAIN_URL = "https://api.praktikum.movies.nomoredomains.rocks";
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.token;
    // this.MAIN_URL = "http://localhost:3001";
    this.BASE_URL = "https://api.nomoreparties.co";
  }

  checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  };

  register(name, email, password) {
    return fetch(this.MAIN_URL + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this.checkResponse(res));
  }

  login(email, password) {
    return fetch(this.MAIN_URL + "/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this.checkResponse(res));
  }

  checkToken(token) {
    return fetch(this.MAIN_URL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this.checkResponse(res));
  }

  getUserInfo = (token) => {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  updateUser = (data) => {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this.checkResponse(res));
  };

  saveMovie = (movie) => {
    return fetch(this.MAIN_URL + "/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: this.BASE_URL + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: `${this.BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this.checkResponse(res));
  };

  deleteMovie = (movieId) => {

    return fetch(this.MAIN_URL + "/movies/" + movieId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("deleteMovie then", res);
      this.checkResponse(res);
    });

  };

  getSavedMovies = (token) => {
    return fetch(this.MAIN_URL + "/movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this.checkResponse(res));
  };
}
const mainApi = new MainApi({
  baseUrl: "http://localhost:3001",
});

export default mainApi;
