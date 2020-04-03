import {
  FETCH_QUALIFICATIONS
  //FETCH_QUALIFICATIONS_INFOS
} from "../actions/types";

const initialState = {
  qualifications: []
  // qualificationsInformations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUALIFICATIONS:
      return {
        ...state,
        qualifications: action.payload
      };
    // case FETCH_QUALIFICATIONS_INFOS:
    //   return {
    //     ...state,
    //     qualificationsInformations: action.payload
    //   };
    default:
      return state;
  }
}
