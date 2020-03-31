import { FETCH_COLLABORATORS_INFOS } from "../actions/types";

const initialState = {
  collaboratorsInfos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLABORATORS_INFOS:
      return {
        ...state,
        collaboratorsInfos: action.payload
      };

    default:
      return state;
  }
}
