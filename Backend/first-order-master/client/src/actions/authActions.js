import { SET_AUTH_USER } from "./actions_types";
import axios from "axios";
import * as routes from "../constants/routes";
import { GRAPHQL_URL } from "../graphQLRoutes";

export function busignup(props, fname, lname, email, password, confirmPW) {
  return async function(dispatch) {
    try {
      const requestBody = {
        query: `
                  mutation {
                    addBusinessUser(userInput: {
                    fname: "${fname}", 
                    lname: "${lname}", 
                    email: "${email}", 
                    password: "${password}", 
                    confirmPW: "${confirmPW}"}){
                        id
                        email
                        fname
                        lname
                        token
                          restaurants {
                            id
                            name
                          }
                      }
                  }
              `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.error);
      } else {
        const { id, token, fname, lname, email, restaurants } = await data.data
          .addBusinessUser;

        dispatch({
          type: SET_AUTH_USER,
          payload: {
            authUser: {
              id: id,
              email: email,
              fname: fname,
              lname: lname
            },
            restaurants: restaurants
          }
        });
        localStorage.setItem("token", token);
        props.history.push(routes.HOME);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function buauth() {
  return async function(dispatch) {
    const token = localStorage.getItem("token");

    if (!!token) {
      try {
        const requestBody = {
          query: `
                   query {
                    verifyBusinessUserToken(token: "${token}") {
                           id
                           email
                           fname
                           lname
                           restaurants {
                            id
                            name
                          }
                       }
                   }
                `
        };

        const { data } = await axios.post(GRAPHQL_URL, requestBody);
        const user = await data.data.verifyBusinessUserToken;

        console.log(user);

        if (user) {
          dispatch({
            type: SET_AUTH_USER,
            payload: {
              authUser: {
                id: user.id,
                email: user.email,
                fname: user.fname,
                lname: user.lname
              },
              restaurants: user.restaurants
            }
          });
        } else {
          dispatch({
            type: SET_AUTH_USER,
            payload: { authUser: null, restaurants: [] }
          });
          localStorage.removeItem("token");
        }
      } catch {
        dispatch({
          type: SET_AUTH_USER,
          payload: { authUser: null, restaurants: [] }
        });
      }
    } else {
      dispatch({
        type: SET_AUTH_USER,
        payload: { authUser: null, restaurants: [] }
      });
    }
  };
}

export function bulogout() {
  return function(dispatch) {
    console.log("logout called");
    dispatch({
      type: SET_AUTH_USER,
      payload: { authUser: null }
    });

    localStorage.removeItem("token");
  };
}

export function bulogin(props, email, password) {
  return async function(dispatch) {
    console.log("login called");
    try {
      const requestBody = {
        query: `
                        query {
                          businessUserLogin(email: "${email}", password: "${password}") {
                                id
                                token
                                email
                                fname
                                lname
                                restaurants {
                                  id
                                  name
                                }
                            }
                        }
                    `
      };

      const { data } = await axios.post(GRAPHQL_URL, requestBody);

      if (data.errors) {
        console.log(data.errors);
      } else {
        const { id, token, fname, lname, email, restaurants } = await data.data
          .businessUserLogin;

        dispatch({
          type: SET_AUTH_USER,
          payload: {
            authUser: {
              id: id,
              email: email,
              fname: fname,
              lname: lname
            },
            restaurants: restaurants
          }
        });
        localStorage.setItem("token", token);
        props.history.push(routes.HOME);
      }
    } catch (e) {
      console.log(e);
    }
  };
}
