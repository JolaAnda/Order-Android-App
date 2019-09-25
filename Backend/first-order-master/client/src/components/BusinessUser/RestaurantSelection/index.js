import React, { useState } from "react";
import AddRestaurantDialog from "./AddRestaurantDialog";
import RestaurantList from "./RestaurantList";

const RestaurantSelection = function() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <RestaurantList
        open={open}
        setOpen={setOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />

      <AddRestaurantDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default RestaurantSelection;
