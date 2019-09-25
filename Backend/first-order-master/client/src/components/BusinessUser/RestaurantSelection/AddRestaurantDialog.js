import React, { useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { addRestaurant } from "../../../actions/restaurantActions";
import { buauth } from "../../../actions/authActions";

const AddRestaurantDialog = function(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleChange = setter => e => {
    setter(e.target.value);
  };

  //Add form new restaurant close handler
  const handleAddFormClose = () => {
    props.setOpen(false);
  };

  //add form new restauramt submit and close handler
  const handleAddFormCloseAndSubmit = () => {
    props.setOpen(false);
    props.addRestaurant(name, address, props.authUser.id);
    props.buauth();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleAddFormClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a new restaurant</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your basic restaurant information. After clicking "Save", you
          will be forwarded to edit more deeply.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={handleChange(setName)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Address"
          type="text"
          fullWidth
          onChange={handleChange(setAddress)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddFormClose} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleAddFormCloseAndSubmit}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser
  };
}

export default connect(
  mapStateToProps,
  { addRestaurant, buauth }
)(AddRestaurantDialog);
