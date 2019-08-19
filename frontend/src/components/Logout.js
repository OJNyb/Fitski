import React from "react";
import { useAxios } from "../hooks/useAxios";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const Logout = () => {
  const { state } = useAxios("/user/logout");

  const { data, error, isPending, isRejected } = state;

  console.log(data);

  console.log(state);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isRejected) {
    console.log(error);
    return <p>Error... check console</p>;
  }

  if (data && data.message === "success") {
    return (window.location.href = "/");
  }

  return <p>Loading..</p>;
};

export default Logout;
