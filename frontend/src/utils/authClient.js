import axios from "axios";

function getUser() {
  return axios
    .get("/api/user/me")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      Promise.reject(err);
    });
}

function login(values) {
  return axios
    .post("/api/user/login", {
      ...values
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data);
    });
}

function logout(values) {
  return axios
    .get("/api/user/logout", {
      ...values
    })
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err.response.data);
    });
}

const register = values => {
  return axios
    .post("/api/user/register", {
      ...values
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data);
    });
};

export { login, logout, getUser, register };
