import React from "react";
import Grid from "@material-ui/core/Grid";
import RestaurantDashboardHeader from "./restaurantDashboardHeader";
import OrdersPaper from "./OrdersPapers";

const RestaurantDashboard = function() {
  return (
    <div>
      <RestaurantDashboardHeader />

      <OrdersPaper />
    </div>
  );
};

export default RestaurantDashboard;
