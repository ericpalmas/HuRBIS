import {
  FETCH_QUALIFICATIONS,
  FETCH_QUALIFICATIONS_OF_COLLABORATOR,
  ADD_QUALIFICATION_TO_COLLABORATOR,
} from "../actions/types";

const initialState = {
  qualifications: [],
  collaboratorQualifications: [],
  qualifications_added: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case FETCH_QUALIFICATIONS:
      return {
        ...state,
        qualifications: action.payload,
      };

    case FETCH_QUALIFICATIONS_OF_COLLABORATOR:
      return {
        ...state,
        collaboratorQualifications: action.payload,
      };
    case ADD_QUALIFICATION_TO_COLLABORATOR:
      return {
        ...state,
        qualifications_added: [action.payload, ...state.qualifications_added],
      };

    default:
      return state;
  }
}
