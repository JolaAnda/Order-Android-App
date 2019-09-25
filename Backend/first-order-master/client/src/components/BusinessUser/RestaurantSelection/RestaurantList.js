import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { setRestaurant } from "../../../actions/restaurantActions";
import { updateRestaurants } from "../../../actions/restaurantActions";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const getStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

const RestaurantList = function(props) {
  const classes = getStyles();

  const handleAddFormOpen = () => {
    props.setAnchorEl(null);
    props.setOpen(true);
  };

  //restaurant choose open handler
  const handleClick = event => {
    props.updateRestaurants(props.authUser.id);
    props.setAnchorEl(event.currentTarget);
  };

  //restarant choose menu item handler
  const handleMenuItemClick = id => {
    props.setAnchorEl(null);
    props.setRestaurant(id);
  };

  //restaurant choose close handler
  const handleClose = () => {
    props.setAnchorEl(null);
  };

  function createRestaurantList() {
    var restaurantArray = props.userRestaurants;

    if (restaurantArray) {
      return restaurantArray.map(restaurant => {
        return (
          <MenuItem
            key={restaurant.name}
            onClick={() => handleMenuItemClick(restaurant.id)}
          >
            {restaurant.name}
          </MenuItem>
        );
      });
    }
  }

  return (
    <div>
      <Button
        className={classes.button}
        aria-owns={props.anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.currentRestaurant
          ? props.currentRestaurant.name
          : "Choose Restaurant"}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={handleClose}
      >
        {createRestaurantList()}
        <MenuItem onClick={handleAddFormOpen}>Add new Restaurant</MenuItem>
      </Menu>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser,
    userRestaurants: state.sessionState.restaurants,
    currentRestaurant: state.sessionState.activeRestaurant
  };
}

export default connect(
  mapStateToProps,
  { setRestaurant, updateRestaurants }
)(RestaurantList);
