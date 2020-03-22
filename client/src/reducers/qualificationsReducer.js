import { FETCH_QUALIFICATIONS } from "../actions/types";

const initialState = {
  qualifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUALIFICATIONS:
      console.log("reducer");
      return {
        // ...state ritorna lo stato corrente, dopo aver fatto la get dei dati rimettiamo loading a false
        ...state,
        qualifications: action.payload
      };
    default:
      return state;
  }
}
