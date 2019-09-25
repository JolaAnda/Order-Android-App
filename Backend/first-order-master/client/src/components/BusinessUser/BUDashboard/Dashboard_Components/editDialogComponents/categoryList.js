import React, { useState } from "react";
import { connect } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LoadingStatus from "../../../../LoadingStatus";
import { makeStyles } from "@material-ui/core/styles";
import ProductOverview from "./productOverview";

const getStyles = makeStyles(theme => ({
  grid: {
    borderRight: "0.1em solid grey",
    padding: "0.5em",
    height: "90vh"
  },
  divider: {
    marginTop: 15,
    marginBottom: 20
  },
  paper: {
    minHeight: "88vh",
    maxHeight: "88vh",
    overflow: "auto"
  },
  listItem: {
    background: "#e0dbdb",
    marginBottom: "5px"
  },
  text: {
    padding: theme.spacing(2, 2, 0)
  }
}));

const CategoryList = function(props) {
  const [selectedCategory, setselectedCategory] = useState(false);
  const [productsShown, setproductsShown] = useState(false);

  const handleCategoryItemClick = id => {
    setproductsShown(true);
    setselectedCategory(id);
  };

  const classes = getStyles();

  if (props.loading) return <LoadingStatus />;

  let categories = props.categories.map((category, key) => {
    return (
      <ListItem
        button
        key={key}
        className={classes.listItem}
        onClick={() => handleCategoryItemClick(category.id)}
      >
        <ListItemText
          primary={category.name}
          secondary={category.products.length + " Products"}
        />
      </ListItem>
    );
  });

  return (
    <div>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography className={classes.text} variant="h5" gutterBottom>
              Categories
            </Typography>
            <Divider />
            <List>{categories}</List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {productsShown ? (
              <ProductOverview clickedCategory={selectedCategory} />
            ) : (
              <h1>Choose A Category</h1>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    categories: state.menuState.menu,
    loading: state.menuState.loading
  };
}

export default connect(
  mapStateToProps,
  {
    //addCategory, updateCategory
  }
)(CategoryList);
