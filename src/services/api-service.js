import config from "../config";

const ApiService = {
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getBooks() {
    return fetch(`${config.API_ENDPOINT}/books`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getComments() {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comments/addcomment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getAllLikes() {
    return fetch(`${config.API_ENDPOINT}/likes`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getLikes(variable) {
    return fetch(`${config.API_ENDPOINT}/likes/getLikes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: variable,
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  upLike(variable) {
    return fetch(`${config.API_ENDPOINT}/likes/upLike`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(variable),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  unLike(variable) {
    return fetch(`${config.API_ENDPOINT}/likes/unLike`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(variable),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};
export default ApiService;
