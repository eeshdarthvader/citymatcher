import axios from "axios";

const dataService = store => next => async action => {
  /*
  Pass all actions through by default
  */
  next(action);
  switch (action.type) {
    case "GET_NEWCITY_DATA":
      /*
    In case we receive an action to send an API request, send the appropriate request
    */

      const res = await axios.get("http://localhost:8080/v1/cities");

      next({
        type: "GET_NEWCITY_DATA_RECEIVED",
        data: res.data
      });

      break;
    /*
  Do nothing if the action does not interest us
  */
    default:
      break;
  }
};

export default dataService;
