import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import usePlans from "../../hooks/usePlans";
import Loading from "../shared/SVGs/Loading";

import PlansNav from "./PlansNav";

import "./plans.css";

const Plans = () => {
  const { state, dispatch } = usePlans();
  const [redirect, setRedirect] = useState(false);

  const { isPending, isRejected, woPlans } = state;

  if (isPending) return <Loading />;

  if (isRejected) return <p>Derp</p>;

  if (!woPlans) {
    return <Loading />;
  }

  if (redirect) {
    return <Redirect to={`/plans/${redirect}`} />;
  }

  let tbody = woPlans.map(plan => (
    <PlanRow plan={plan} setRedirect={setRedirect} />
  ));

  return (
    <>
      <PlansNav dispatch={dispatch} />
      <table className="plans-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </>
  );
};

const PlanRow = ({ plan, setRedirect }) => {
  const { _id, name, user, description } = plan;
  const { name: userName } = user;
  return (
    <tr onClick={() => setRedirect(_id)}>
      <td>{name}</td>
      <td>{userName}</td>
      <td>{description}</td>
    </tr>
  );
};

export default Plans;
