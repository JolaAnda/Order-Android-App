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

//Signup component for single user

function SUSignup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
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
                  mutation {
                    addUser(userInput: {
                      fname: "${fname}", 
                      lname: "${lname}", 
                      email: "${email}", 
                      password: "${password}", 
                      confirmPW: "${confirmPW}"}){
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
        const { id, token } = await data.data.addUser;

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
        Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>SignUp to order</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            onChange={handleChange(setFname)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            onChange={handleChange(setLname)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="E-Mail"
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
          <TextField
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={handleChange(setConfirmPW)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default withRouter(SUSignup);
