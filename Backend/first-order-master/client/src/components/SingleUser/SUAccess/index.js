import React from "react";
import SULogin from "../SULogin";
import SUSignup from "../SUSignup";
import { withRouter } from "react-router-dom";

//Page for Business User Login and Signup

function SUAccess() {
  return (
    <div>
      <h1> User </h1>
      <SULogin />
      <SUSignup />
    </div>
  );
}

export default withRouter(SUAccess);
