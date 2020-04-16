import {
  FETCH_COLLABORATORS_INFOS,
  FETCH_COLLABORATOR_INFOS,
  FETCH_COLLABORATORS,
  // FETCH_SINGLE_COLLABORATOR,
  ADD_COLLABORATOR,
  DELETE_COLLABORATOR,
} from "../actions/types";

const initialState = {
  collaborator: {},
  collaborators: [],
  collaboratorsInfos: [],
  collaboratorInfos: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLABORATORS:
      return {
        // ...state ritorna lo stato corrente, dopo aver fatto la get dei dati rimettiamo loading a false
        ...state,
        collaborators: action.payload,
      };
    // case FETCH_SINGLE_COLLABORATOR:
    //   return {
    //     ...state,
    //     collaborator: state.collaborators.filter(
    //       (collaborator) => collaborator._id !== action.payload
    //     ),
    //   };
    case FETCH_COLLABORATORS_INFOS:
      return {
        ...state,
        collaboratorsInfos: action.payload,
      };
    case ADD_COLLABORATOR:
      return {
        ...state,
        collaborator: [action.payload, ...state.collaborator],
      };
    case DELETE_COLLABORATOR:
      return {
        ...state,
        collaborators: state.collaborators.filter(
          (collaborator) => collaborator._id !== action.payload
        ),
      };
    case FETCH_COLLABORATOR_INFOS:
      console.log("FETCH_COLLABORATOR_INFOS");
      return {
        ...state,
        collaboratorInfos: action.payload,
      };

    default:
      return state;
  }
}
