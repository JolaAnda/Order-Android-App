import React, { useState } from "react";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/CheckCircle";
import DateFnsUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { addPrice } from "../../../../../actions/menuActions";

const PriceListItem = props => {
  const [price, setPrice] = useState("");

  const handleChange = setter => e => {
    setter(e.target.value);

    console.log(price);
  };

  function savePrice() {
    console.log("save price clicked");
    props.addPrice(props.productID, price);
  }

  return (
    <div>
      <ListItem>
        <Paper>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={5}>
              <TextField
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="Price"
                margin="normal"
                type="number"
                onChange={handleChange(setPrice)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item style={{ marginRight: "10px" }}>
              <IconButton onClick={savePrice}>
                <SaveIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </ListItem>
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
  { addPrice }
)(PriceListItem);
