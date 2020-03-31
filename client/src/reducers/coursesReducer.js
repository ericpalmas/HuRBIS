import { FETCH_COURSES, ADD_COURSE, DELETE_COURSE } from "../actions/types";

const initialState = {
  courses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      console.log("courses reducer");
      return {
        // ...state ritorna lo stato corrente, dopo aver fatto la get dei dati rimettiamo loading a false
        ...state,
        courses: action.payload
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload)
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses]
      };

    default:
      return state;
  }
}
