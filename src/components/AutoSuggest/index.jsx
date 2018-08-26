import React from "react";

import Autosuggest from "react-autosuggest";

import Paper from "@material-ui/core/Paper";

const AutoSuggestComponent = ({
  classes,
  autosuggestProps,
  single,
  handleChange,
  cityId
}) => {
  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        placeholder: "Search the city",
        value: single,
        onChange: handleChange("single")
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
};

export default AutoSuggestComponent;
