import React from "react";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper
  },
  primary: {
    fontSize: "14px"
  },
  secondary: {
    fontSize: "20px"
  }
});

function SimpleList(props) {
  const { classes, newCity, selectedCity, id } = props;
  return (
    <div className={classes.root}>
      <Divider />
      <List className={classes.root}>
        <ListItem>
          <ListItemText
            className={classes.secondary}
            primary="Selected City"
            secondary={selectedCity}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="City Id" secondary={id} />
        </ListItem>
        <ListItem>
          <ListItemText primary="New City " secondary={newCity} />
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles)(SimpleList);
