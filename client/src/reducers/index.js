import { combineReducers } from "redux";
import collaboratorsReducer from "./collaboratorsReducer";
import qualificationsReducer from "./qualificationsReducer";
import coursesReducer from "./coursesReducer";

export default combineReducers({
  collaborators: collaboratorsReducer,
  qualifications: qualificationsReducer,
  courses: coursesReducer
});
