import React, { useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckBox from "@material-ui/core/Checkbox";
import ProductListItem from "./ProductListItem";
import DialogContent from "@material-ui/core/DialogContent";
import { deleteOrder } from "./../../../actions/menuActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const OrderDetails = props => {
  function closeDialog() {
    props.setOpen(false);
  }

  function deleteOrder() {
    props.deleteOrder(props.getOrder.id);
  }

  const orderedProducts = props.getOrder.products.map((product, key) => {
    return <ProductListItem key={key} getProduct={product} />;
  });

  console.log(props.getOrder);

  return (
    <Dialog open={props.isOpen} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        {"Order for Table " +
          props.getOrder.tableNumber +
          " | " +
          props.getOrder.time}
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" justify="center">
          <Grid item>
            <List>{orderedProducts}</List>
            <Divider />
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography>Total: {props.getOrder.total}$</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ marginTop: "10px" }}
            >
              <Grid item>
                <Button onClick={closeDialog}>Close</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" onClick={deleteOrder}>
                  Deliver
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.menuState.orders,
    activeRestaurant: state.sessionState.activeRestaurant
  };
}

export default connect(
  mapStateToProps,
  { deleteOrder }
)(OrderDetails);
