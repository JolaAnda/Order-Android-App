import React, { useState } from "react";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import OrderDetails from "../OrderDetails";

const OrderListTileItem = props => {
  console.log(props.getOrder.tableNumber);

  const [open, setOpen] = useState(false);

  function openOrderDetails() {
    setOpen(true);
  }
  const PictureURL = String(
    "https://firebasestorage.googleapis.com/v0/b/firstorder.appspot.com/o/images%2Ficon_green.png?alt=media&token=0fbd77d8-ec3c-4e36-8688-8bdd3637cd60"
  );
  return (
    <div>
      <img src={PictureURL} style={{ height: "230px", width: "auto" }} />
      <GridListTileBar
        title={"Table No: " + props.getOrder.tableNumber}
        subtitle={"Total: " + props.getOrder.total + "$"}
        actionIcon={
          <IconButton aria-label={`Open Details`} onClick={openOrderDetails}>
            <EyeIcon />
          </IconButton>
        }
      />
      <OrderDetails isOpen={open} setOpen={setOpen} getOrder={props.getOrder} />
    </div>
  );
};

export default OrderListTileItem;
