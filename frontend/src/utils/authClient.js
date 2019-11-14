import axios from "axios";

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

export { login, register };
