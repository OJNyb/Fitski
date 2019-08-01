import React from "react";

import "./createPlan.css";

// Just have modal in My workout plans?

const CreatePlan = () => {
  return (
    <div>
      <form className="create-plan-form">
        <input name="name" placeholder="Name" />
        <input name="description" placeholder="Description" />
        <input name="category" placeholder="Category" />
      </form>
    </div>
  );
};

export default CreatePlan;
