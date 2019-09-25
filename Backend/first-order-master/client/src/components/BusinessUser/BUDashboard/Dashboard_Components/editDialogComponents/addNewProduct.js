import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addProduct } from "../../../../../actions/menuActions";

const AddNewProduct = props => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [type, settype] = useState("");
  const [imagePath, setImagePath] = useState("");

  console.log(name);
  function handleClose() {
    props.setAddOpen(false);
  }

  function handleSave() {
    var product = {
      name: name,
      description: description,
      type: type,
      imagePath: imagePath
    };

    props.addProduct(props.categoryID, product);
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
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new product to your menu list
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
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            onChange={handleChange(setdescription)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            type="text"
            fullWidth
            onChange={handleChange(settype)}
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
  { addProduct }
)(AddNewProduct);
