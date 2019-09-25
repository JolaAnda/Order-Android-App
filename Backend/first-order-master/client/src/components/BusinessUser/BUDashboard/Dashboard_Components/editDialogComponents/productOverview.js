import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Divider,
  Grid,
  GridList,
  GridListTile,
  Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddNewProduct from "./addNewProduct";
import SingleProductItem from "./SingleProductItem";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  button: {
    margin: theme.spacing(1)
  },
  gridWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    background: "#fffff"
  },
  gridList: {
    width: "100%",
    height: "auto",
    background: "#fffff"
  }
}));

const ProductOverview = function(props) {
  const classes = useStyles();

  const [addProductOpen, setaddProductOpen] = useState(false);

  var category = props.categories.find(category => {
    return category.id === props.clickedCategory;
  });

  const handleAddOpen = () => {
    setaddProductOpen(true);
  };

  //Creates item for every product of the clicked category
  let productView = category.products.map((product, key) => {
    return (
      <GridListTile key={product.id}>
        <SingleProductItem getProduct={product} />
      </GridListTile>
    );
  });

  return (
    <div>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Products of {category.name}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                  handleAddOpen();
                }}
              >
                Add A Product
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <GridList cellHeight={230} cols={3} className={classes.gridList}>
            {productView}
          </GridList>
        </Grid>
      </Grid>
      <AddNewProduct
        isAddOpen={addProductOpen}
        setAddOpen={setaddProductOpen}
        categoryID={props.clickedCategory}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.menuState.menu
  };
}
export default connect(
  mapStateToProps,
  {}
)(ProductOverview);
