import { FETCH_QUALIFICATIONS_INFOS } from "../actions/types";

const initialState = {
  qualificationsInfos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUALIFICATIONS_INFOS:
      return {
        ...state,
        qualificationsInfos: action.payload
      };

    default:
      return state;
  }
}
