import { combineReducers } from "redux";
import data from "./data";
import loading from "./loading";

const reducer = combineReducers({
  data: data,
  loading: loading
});

export default reducer;
