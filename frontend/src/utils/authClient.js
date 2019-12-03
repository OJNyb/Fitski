import axios from "axios";

function getUser() {
  return axios
    .get("/user/me")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err.response);
      return Promise.reject(err);
    });
}

function login(values) {
  return axios
    .post("/user/login", {
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
    .get("/user/logout", {
      ...values
    })
    .then(res => {
      console.log(res);
      return Promise.resolve(res.data);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err.response.data);
    });
}

const register = values => {
  return axios
    .post("/user/register", {
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
