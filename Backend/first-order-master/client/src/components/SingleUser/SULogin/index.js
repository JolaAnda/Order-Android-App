import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "redux-react-hook";
import { withRouter } from "react-router-dom";
import * as actions from "../../../actions/actions_types";
import * as routes from "../../../constants/routes";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Login for Single User

function SULogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = setter => e => {
    setter(e.target.value);
  };

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setOpen(false);
    try {
      const requestBody = {
        query: `
                  query {
                    userLogin(email: "${email}", password: "${password}") {
                          id
                          token
                          email
                      }
                  }
              `
      };

      const { data } = await axios.post(
        "http://localhost:5000/graphql",
        requestBody
      );

      if (data.errors) {
        setError(data.errors[0].message);
        setLoading(false);
      } else {
        setError(null);
        setLoading(false);
        const { id, token } = await data.data.userLogin;

        dispatch({
          type: actions.SET_AUTH_USER,
          authUser: {
            id,
            email
          }
        });
        localStorage.setItem("token", token);
        props.history.push(routes.HOME);
      }
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Login to order</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange(setEmail)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={handleChange(setPassword)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default withRouter(SULogin);
