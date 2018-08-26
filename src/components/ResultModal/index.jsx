import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import SimpleList from "Lib/List";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    textAlign: "center"
  }
};

class ResultModal extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, city, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        modal={true}
        contentStyle={{ width: "100%", maxWidth: "none" }}
        aria-labelledby="simple-dialog-title"
        fullWidth={true}
        {...other}
      >
        <DialogTitle
          classes={{
            root: classes.root,
            title: classes.title
          }}
          id="simple-dialog-title"
        >
          City Data
        </DialogTitle>

        <SimpleList
          selectedCity={selectedValue.name}
          id={selectedValue.id}
          newCity={city}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(ResultModal);
