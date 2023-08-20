import React from "react";

const BASE_URL = "https://auth.nomoreparties.co";

class Auth extends React.Component {
  constructor(url) {
    super();
    this.url = url;
  }

  authorization({ password, email }) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => {
      return this._getResponseDate(res);
    });
  }

  registration({ password, email }) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => {
      return this._getResponseDate(res);
    });
  }

  getValidToken(jwt) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._getResponseDate(res);
    });
  }

  _getResponseDate(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const auth = new Auth(BASE_URL);
export default auth;
