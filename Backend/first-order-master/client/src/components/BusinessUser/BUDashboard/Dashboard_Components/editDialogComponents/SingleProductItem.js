import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  GridListTileBar
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditProduct from "./EditProduct";
import { purple, blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  icon: {
    fontSize: 20
  },
  iconButton: {
    marginRight: "10px"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  paper: {
    minHeight: "230px"
  }
}));

const ColorIconButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500])
  }
}))(IconButton);

const SingleProductItem = props => {
  const classes = useStyles();

  useEffect(() => {
    if (props.getProduct.image_path == "undefined") {
      setProductPath(false);
      console.log("If abgerufen");
    } else {
      setProductPath(props.getProduct.image_path);
      console.log("Else abgerufen");
    }
  });

  const [editProductOpen, seteditProductOpen] = useState(false);
  const [productPath, setProductPath] = useState(false);

  function handleOpen() {
    seteditProductOpen(true);
  }

  console.log(props.getProduct.image_path);
  return (
    <div>
      <Paper className={classes.paper}>
        <GridListTileBar
          titlePosition="top"
          title={props.getProduct.name}
          actionIcon={
            <section>
              <ColorIconButton
                className={classes.iconButton}
                onClick={handleOpen}
              >
                <EditIcon className={classes.icon} />
              </ColorIconButton>
              <ColorIconButton className={classes.iconButton}>
                <DeleteIcon className={classes.icon} />
              </ColorIconButton>
            </section>
          }
        />
        <Grid container direction="column">
          <Grid item>
            {productPath ? (
              <img className={classes.img} src={productPath} />
            ) : (
              <h1>No Pic</h1>
            )}
          </Grid>
        </Grid>
      </Paper>
      <EditProduct
        getProduct={props.getProduct}
        isOpen={editProductOpen}
        setIsOpen={seteditProductOpen}
        getProductPath={productPath}
        setProductPath={setProductPath}
      />
    </div>
  );
};

export default SingleProductItem;
