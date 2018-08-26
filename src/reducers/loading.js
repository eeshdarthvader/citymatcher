const loading = (state = true, action) => {
  switch (action.type) {
    case "GET_NEWCITY_DATA":
      return true;
    case "GET_NEWCITY_DATA_RECEIVED":
      return false;
    case "GET_NEWCITY_DATA_ERROR":
      return false;
    default:
      return state;
  }
};

export default loading;
