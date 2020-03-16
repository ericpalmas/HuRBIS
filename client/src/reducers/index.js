import { combineReducers } from "redux";
import collaboratorsReducer from "./collaboratorsReducer";

export default combineReducers({
  collaborators: collaboratorsReducer
});
