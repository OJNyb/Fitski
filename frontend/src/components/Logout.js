import React from "react";
import { useAxios } from "../hooks/useAxios";

import Loading from "./shared/SVGs/Loading";

const Logout = () => {
  const { state } = useAxios("/user/logout");

  const { data, error, isPending, isRejected } = state;

  console.log(data);

  console.log(state);

  if (isPending) {
    return <Loading />;
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
