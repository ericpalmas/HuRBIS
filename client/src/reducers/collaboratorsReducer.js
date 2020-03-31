import { FETCH_COLLABORATORS } from "../actions/types";
import { FETCH_SINGLE_COLLABORATOR } from "../actions/types";
import { FETCH_COLLABORATORS_INFOS } from "../actions/types";

const initialState = {
  collaborator: {},
  collaborators: [],
  collaboratorsInfos: []
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
          collaborator => collaborator._id !== action.payload
        )
      };
    case FETCH_COLLABORATORS_INFOS:
      return {
        ...state,
        collaboratorsInfos: action.payload
      };

    default:
      return state;
  }
}
