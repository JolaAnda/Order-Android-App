import React, { useEffect } from "react";
import "./App.css";
import * as routes from "../../constants/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BUAccess from "../BusinessUser/BUAccess";
import SUAccess from "../SingleUser/SUAccess";
import Home from "../Home";
import { connect } from "react-redux";
import Navigation from "../Navbar";
import { buauth } from "../../actions/authActions";

//Last component before root component

function App(props) {
  useEffect(() => {
    props.buauth();
  });

  if (props.loading) return <h1>Loading....</h1>;

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navigation />
        <header className="App-header">
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home />} />
            <Route exact path={routes.BULOGIN} component={() => <BUAccess />} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.sessionState.loading
  };
}

export default connect(
  mapStateToProps,
  { buauth }
)(App);
