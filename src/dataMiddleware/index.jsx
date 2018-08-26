import request from "superagent";

const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action);
  switch (action.type) {
    case "GET_NEWCITY_DATA":
      /*
    In case we receive an action to send an API request, send the appropriate request
    */

      request.get("http://localhost:8080/v1/cities").end((err, res) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: "GET_NEWCITY_DATA_ERROR",
            err
          });
        }
        const data = res.body;
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        next({
          type: "GET_NEWCITY_DATA_RECEIVED",
          data
        });
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
