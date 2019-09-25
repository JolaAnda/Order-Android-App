import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { busignup } from "../../../actions/authActions";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { classes } = props;

  const handleChange = setter => e => {
    setter(e.target.value);
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    props.busignup(props, fname, lname, email, password, confirmPW);
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Business User Signup
      </Typography>
      <form className={classes.form}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">First Name</InputLabel>
          <Input
            id="fname"
            name="fname"
            autoComplete="fname"
            autoFocus
            onChange={handleChange(setFname)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Last Name</InputLabel>
          <Input
            id="lname"
            name="lname"
            autoComplete="lname"
            onChange={handleChange(setLname)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleChange(setEmail)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            onChange={handleChange(setPassword)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Confirm Password</InputLabel>
          <Input
            name="confirmpassword"
            type="password"
            id="confirmpassword"
            onChange={handleChange(setConfirmPW)}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submit}
        >
          SignUp
        </Button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser
  };
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { busignup }
)(withRouter(withStyles(styles)(Signup)));
