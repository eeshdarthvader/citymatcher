const inititalState = {
  cityList: []
};
const reducer = function(state = { ...inititalState }, action) {
  switch (action.type) {
    case "GET_NEWCITY_DATA_RECEIVED":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
