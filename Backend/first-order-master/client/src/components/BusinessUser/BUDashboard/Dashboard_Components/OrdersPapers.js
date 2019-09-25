import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Paper, Grid, GridList, GridListTile } from "@material-ui/core";
import { getAllOrders } from "../../../../actions/menuActions";
import Typography from "@material-ui/core/Typography";
import OrderListTileItem from "./OrderListTileItem";

const OrdersPaper = props => {
  useEffect(() => {
    const interval = setInterval(() => {
      props.getAllOrders(props.activeRestaurant.id);
    }, 2000);
    return () => clearInterval(interval);
  });

  let orderView;

  if (props.orders != null) {
    console.log(props.activeRestaurant.id);
    orderView = props.orders.map((order, key) => {
      return (
        <GridListTile key={order.id}>
          <OrderListTileItem getOrder={order} />
        </GridListTile>
      );
    });
  }
  //orderView = <h1>No orders</h1>;

  return (
    <div>
      <GridList cellHeight={230} cols={3}>
        {orderView}
      </GridList>
    </div>
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
  { getAllOrders }
)(OrdersPaper);
