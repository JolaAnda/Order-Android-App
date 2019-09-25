import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CategoryList from "./editDialogComponents/categoryList";
import AddNewCategory from "./editDialogComponents/addNewCategory";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  dialogPaper: {
    overflow: "hidden"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDialog = function(props) {
  const [addOpen, setaddOpen] = useState(false);

  const classes = useStyles();

  function handleClose() {
    props.setOpen(false);
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        scroll={"body"}
        PaperProps={{ classes: { root: classes.dialogPaper } }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit your card
            </Typography>
            <Button color="inherit" onClick={setaddOpen}>
              add new category
            </Button>
            <Button color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <CategoryList />
      </Dialog>
      <AddNewCategory isAddOpen={addOpen} setAddOpen={setaddOpen} />
    </div>
  );
};

export default EditDialog;
