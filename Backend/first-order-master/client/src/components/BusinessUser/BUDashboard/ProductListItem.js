import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckBox from "@material-ui/core/Checkbox";

export default function ProductListItem(props) {
  const [disabled, setdisabled] = useState(false);
  function handleToggle() {
    setdisabled(!disabled);
  }

  return (
    <div>
      <ListItem disabled={disabled}>
        <ListItemText
          primary={props.getProduct.name}
          secondary={"Price: " + props.getProduct.price + "€"}
        />
        <ListItemSecondaryAction>
          <CheckBox edge="end" onChange={handleToggle} />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
