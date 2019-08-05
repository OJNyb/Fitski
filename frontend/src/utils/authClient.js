import axios from "axios";

function login({ email, password }) {
  return axios
    .post("/user/login", {
      email,
      password
    })
    .then(res => {
      return res.data;
    });
}

const register = ({ name, email, password, password2 }) => {
  return axios
    .post("/user/register", {
      name,
      email,
      password,
      password2
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export { login, register };
