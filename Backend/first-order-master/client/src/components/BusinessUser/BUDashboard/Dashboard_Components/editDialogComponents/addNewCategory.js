import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addCategory, getMenu } from "../../../../../actions/menuActions";

const AddNewCategory = function(props) {
  const [name, setname] = useState("");

  console.log(name);
  function handleClose() {
    props.setAddOpen(false);
  }

  function handleSave() {
    props.addCategory(props.currentRestaurant.id, name);
    props.setAddOpen(false);
  }
  const handleChange = setter => e => {
    setter(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.isAddOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new category to your menu list
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChange(setname)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentRestaurant: state.sessionState.activeRestaurant
  };
}

export default connect(
  mapStateToProps,
  { addCategory, getMenu }
)(AddNewCategory);
