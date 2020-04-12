import {
  FETCH_QUALIFICATIONS,
  FETCH_QUALIFICATIONS_OF_COLLABORATOR,
  ADD_QUALIFICATION_TO_COLLABORATOR,
  REMOVE_QUALIFICATIONS_FROM_COLLABORATOR,
  ADD_QUALIFICATION,
} from "../actions/types";

const initialState = {
  qualifications: [],
  collaboratorQualifications: [],
  qualifications_added: [],
  qualificationsDeleted: [],
  newQualification: {},
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
    case REMOVE_QUALIFICATIONS_FROM_COLLABORATOR:
      return {
        ...state,
        qualificationsDeleted: [action.payload, ...state.qualificationsDeleted],
      };
    case ADD_QUALIFICATION:
      console.log("ADD_QUALIFICATION");
      return {
        ...state,
        newQualification: [action.payload, ...state.newQualification],
      };

    default:
      return state;
  }
}
