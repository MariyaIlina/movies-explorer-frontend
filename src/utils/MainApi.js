class MainApi {
  constructor() {
    // this.MAIN_URL = "https://api.praktikum.movies.nomoredomains.rocks";
    this.MAIN_URL = "http://localhost:3000";
  }

  checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  };

  // getUserInfo(token){
  //   return fetch(this.MAIN_URL + "/users/me", {
  //     method: "GET",
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Accept': "application/json",
  //       "Content-Type": "application/json",
  //     },

  //   }).then((res)=> this.checkResponse(res))

  // }
  getUserInfo = () => {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._checkResponse);
  };
  updateUser(userName, userEmail, token) {
    return fetch(this.MAIN_URL + "/user/me", {
      //?
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
      }),
    }).then((res) => this.checkResponse(res));
  }

  saveMovie(movie, token) {
    return fetch(this.MAIN_URL + "/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this.checkResponse(res));
  }

  deleteMovie(movieId, token) {
    return fetch(this.MAIN_URL + "/movies/:id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        " Authorization": `Bearer ${token}`,
      },
    }).then((res) => this.checkResponse(res));
  }

  getSavedMovies(token) {
    return fetch(this.MAIN_URL + "movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this.checkResponse(res));
  }
}

export default MainApi;
