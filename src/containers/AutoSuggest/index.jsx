import React from "react";

import { connect } from "react-redux";

import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";
import ResultModal from "Components/ResultModal";

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import axios from "axios";

import AutoSuggestComponent from "Components/AutoSuggest";

const customTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {},
      underline: {
        "&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
        },
        "&:after": {
          borderBottom: "2px solid #bc164d"
        }
      }
    },
    MuiMenuItem: {
      root: {
        height: "10px"
      }
    }
  }
});

let suggestions = [];

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "22px"
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    fontSize: "10px"
  },
  suggestion: {
    display: "block",
    fontSize: "10px"
  },
  suggestion: {
    div: {
      display: "block",
      fontSize: "10px"
    }
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: "10px"
  },
  MuiMenuItem: {
    fontSize: "10px"
  },
  MenuItem: {
    fontSize: "10px"
  },
  input: {
    fontSize: "16px"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class IntegrationAutosuggest extends React.Component {
  popperNode = null;

  state = {
    single: "",
    popper: "",
    suggestions: [],
    selectedSuggestion: "",
    open: false
  };

  renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    );
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  fetchSuggestions = async value => {
    const res = await axios.get(
      "http://localhost:8080/v1/autocomplete",
      {
        params: {
          q: value
        }
      },
      {}
    );
    return await res.data;
  };

  getSuggestions = async value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    suggestions = await this.fetchSuggestions(value);

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 10 &&
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  getSuggestionValue = suggestion => {
    this.setState({ selectedSuggestion: suggestion, open: true });
    console.log("Selected City Object", suggestion);
    return suggestion.name;
  };

  handleSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  render() {
    const { classes, cityName } = this.props;
    const { selectedSuggestion, open } = this.state;

    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion
    };

    return (
      <div className={classes.root}>
        {selectedSuggestion && (
          <ResultModal
            selectedValue={selectedSuggestion}
            open={this.state.open}
            onClose={this.handleClose}
            city={cityName}
          />
        )}
        <MuiThemeProvider theme={customTheme}>
          <AutoSuggestComponent
            autosuggestProps={autosuggestProps}
            single={this.state.single}
            handleChange={this.handleChange}
            classes={classes}
          />
        </MuiThemeProvider>
        <div className={classes.divider} />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(IntegrationAutosuggest));
