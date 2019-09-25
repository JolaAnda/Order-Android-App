import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  Paper,
  Grid,
  DialogTitle,
  Typography,
  Divider,
  DialogContent,
  List
} from "@material-ui/core";
import FileUploader from "react-firebase-file-uploader";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../../../../firebase";
import { addUrlToProduct } from "../../../../../actions/menuActions";
import PriceListItem from "./PriceListItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  img: {
    width: "auto",
    height: "230px",
    marginLeft: "30px",
    marginRight: "30px"
  },
  paper: {
    minHeight: "100%",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  },
  imageItem: {
    alignItems: "center",
    justify: "center",
    textAlign: "center",
    marginBottom: "40px"
  },
  typo: {
    marginTop: "100px",
    marginLeft: "100px"
  }
}));

const EditProduct = props => {
  const classes = useStyles();

  const [progress, setProgress] = useState(0);

  function handleClose() {
    props.setIsOpen(false);
  }

  function handleUploadStart() {
    setProgress(9);
  }

  function handleUploadError() {
    console.log("Error");
  }

  function handleUploadSuccess(filename) {
    setProgress(100);
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        props.setProductPath(url);
        props.addUrlToProduct(props.getProduct.id, url);
      });
  }

  function handleProgress() {}

  return (
    <div className={classes.root}>
      <Dialog
        open={props.isOpen}
        aria-labelledby="edit-product-title"
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="edit-product-title">Edit your product</DialogTitle>

        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.imageItem}>
              <img className={classes.img} src={props.getProductPath} />
            </Grid>
            <Grid item className={classes.imageItem}>
              <FileUploader
                accept="image/*"
                name="image"
                storageRef={firebase.storage().ref("images")}
                filename={props.getProduct.id}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </Grid>

            <Grid item>
              <Paper>
                <List>
                  <PriceListItem productID={props.getProduct.id} />
                </List>
              </Paper>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>Close</Button>
            </Grid>
          </Grid>
        </DialogContent>
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
  { addUrlToProduct }
)(EditProduct);
