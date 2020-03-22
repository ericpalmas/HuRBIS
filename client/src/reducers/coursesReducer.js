import { FETCH_COURSES } from "../actions/types";

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
    default:
      return state;
  }
}
