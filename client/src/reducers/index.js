import { combineReducers } from "redux";
import collaboratorsReducer from "./collaboratorsReducer";
import qualificationsReducer from "./qualificationsReducer";
import coursesReducer from "./coursesReducer";
import collaboratorsInfosReducer from "./collaboratorsInfosReducer";
import qualificationsInfosReducer from "./qualificationsInfosReducer";

export default combineReducers({
  collaborators: collaboratorsReducer,
  qualifications: qualificationsReducer,
  courses: coursesReducer,
  collaboratorsInfos: collaboratorsInfosReducer,
  qualificationsInfos: qualificationsInfosReducer
});
