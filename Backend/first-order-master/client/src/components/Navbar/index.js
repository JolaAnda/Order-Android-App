import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import AuthNavigation from "./buAuth";
import NonAuthNavigation from "./nonAuth";
import { connect } from "react-redux";

//component decides which navigation to show based on users authentication status

function Navigation({ authUser, loading }) {
  if (loading) return <div />;
  return authUser ? <AuthNavigation /> : <NonAuthNavigation />;
}

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser,
    loading: state.sessionState.loading
  };
}

export default connect(
  mapStateToProps,
  null
)(Navigation);
