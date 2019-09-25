import React, { useState } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import EditDialog from "./editDialog";
import { getMenu } from "../../../../actions/menuActions";

const getStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  divider: {
    marginTop: 15,
    marginBottom: 20
  }
}));

const RestaurantDashboardHeader = function(props) {
  const classes = getStyles();

  const [modalOpen, setmodalOpen] = useState(false);

  const handleModalOpen = () => {
    setmodalOpen(true);
    props.getMenu(props.activeRestaurant.id);
  };

  const handleModalClose = () => {
    setmodalOpen(false);
  };

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item xs={3}>
          <Typography variant="h4">
            {props.activeRestaurant.name}{" "}
            <Typography>({props.activeRestaurant.address})</Typography>
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleModalOpen}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />

      <EditDialog isOpen={modalOpen} setOpen={setmodalOpen} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeRestaurant: state.sessionState.activeRestaurant
  };
}

export default connect(
  mapStateToProps,
  { getMenu }
)(RestaurantDashboardHeader);
