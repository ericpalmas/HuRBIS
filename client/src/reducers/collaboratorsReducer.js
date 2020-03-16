import { FETCH_COLLABORATORS } from "../actions/types";

const initialState = {
  collaborators: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLABORATORS:
      console.log("reducer");
      return {
        // ...state ritorna lo stato corrente, dopo aver fatto la get dei dati rimettiamo loading a false
        ...state,
        collaborators: action.payload
      };
    default:
      return state;
  }
}
