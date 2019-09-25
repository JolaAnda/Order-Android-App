import React, { useCallback } from "react";
import { connect } from "react-redux";
import AuthHome from "../BusinessUser/BUDashboard/dashboard";
import NonAuthHome from "./nonauth";
import LoadingStatus from "../LoadingStatus";

//Component decides which page is shown, depending of the users authentication status

function Home({ authUser, loading }) {
  if (loading) return <LoadingStatus />;

  return authUser ? <AuthHome /> : <NonAuthHome />;
}

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser,
    loading: state.sessionState.loading
  };
}

export default connect(mapStateToProps)(Home);
