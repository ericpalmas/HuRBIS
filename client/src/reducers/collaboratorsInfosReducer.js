import {
  FETCH_COLLABORATORS_INFOS,
  FETCH_COLLABORATORS_DATA,
} from "../actions/types";

const initialState = {
  collaboratorsInfos: [],
  collaborators: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLABORATORS_INFOS:
      return {
        ...state,
        collaboratorsInfos: action.payload,
      };

    case FETCH_COLLABORATORS_DATA:
      return {
        ...state,
        collaborators: action.payload,
      };
    default:
      return state;
  }
}
