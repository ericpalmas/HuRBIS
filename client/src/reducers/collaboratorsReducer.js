import { FETCH_COLLABORATORS } from "../actions/types";
import { FETCH_SINGLE_COLLABORATOR } from "../actions/types";

const initialState = {
  collaborator: {},
  collaborators: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLABORATORS:
      return {
        // ...state ritorna lo stato corrente, dopo aver fatto la get dei dati rimettiamo loading a false
        ...state,
        collaborators: action.payload
      };
    case FETCH_SINGLE_COLLABORATOR:
      console.log("reducer single collaborator!!!!!!! " + action.payload);
      return {
        ...state,
        collaborator: state.collaborators.filter(
          collab => collab.id !== action.payload
        )
        // collaborator: [action.payload, ...state.collaborators]
      };
    default:
      return state;
  }
}
