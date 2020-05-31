import config from "../config";

const ApiService = {
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
  },
  getBooks() {
    return fetch(`${config.API_ENDPOINT}/books`, {
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    ); 
  }
}
export default ApiService;