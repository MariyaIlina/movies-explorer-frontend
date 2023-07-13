class Auth {
  constructor() {
    this.BASE_URL = "http://localhost:3000";
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(name, email, password) {
    return fetch(this.BASE_URL + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this.checkResponse(res));
  }

  login(email, password) {
    return fetch(this.BASE_URL + "/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this.checkResponse(res));
  }

  checkToken(token) {
    return fetch(this.BASE_URL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this.checkResponse(res));
  }
}
export default Auth;
