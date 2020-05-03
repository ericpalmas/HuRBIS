import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES_INFOS,
  ADD_COURSE_TO_HISTORY,
  ADD_COURSE_TO_NECESSARY,
  DELETE_COURSE_FROM_HISTORY,
  DELETE_COURSE_FROM_NECESSARY,
  MODIFY_CURRENT_COURSE,
  MODIFY_FROM_CURRENT_TO_HISTORY,
  MODIFY_FROM_CURRENT_TO_NECESSARY,
  MODIFY_HISTORY_COURSE,
  MODIFY_FROM_HISTORY_TO_CURRENT,
  MODIFY_FROM_HISTORY_TO_NECESSARY,
  MODIFY_NECESSARY_COURSE,
  MODIFY_FROM_NECESSARY_TO_CURRENT,
  MODIFY_FROM_NECESSARY_TO_HISTORY,
  ADD_NEW_COURSE,
  DELETE_COURSE_FROM_DATABASE,
  FETCH_COURSES_DATES,
  FETCH_NECESSARY_COURSES_OF_QUALIFICATION,
  ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION,
  RENEW_CURRENT_COURSE,
  GET_MIN_CERTIFICATIONS,
  FETCH_COURSES_OF_COLLABORATOR,
} from "../actions/types";

const initialState = {
  courses: [],
  historyCourses: [],
  necessaryCourses: [],
  coursesInfos: [],
  currentModifiedCourses: [],
  modifiedFromCurrentToHistory: [],
  modifiedFromCurrentToNecessary: [],
  historyModifiedCourses: [],
  modifiedFromHistoryToCurrent: [],
  modifiedFromHistoryToNecessary: [],
  necessaryModifiedCourses: [],
  modifiedFromNecessaryToCurrent: [],
  modifiedFromNecessaryToHistory: [],
  newCourses: [],
  coursesRemoved: [],
  dates: [],
  necessaryCoursesOfQualification: [],
  coursesAddedFromQualification: [],
  coursesOfCollaborator: [],
  renewCourses: [],
  minCertifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case DELETE_COURSE_FROM_DATABASE:
      return {
        ...state,
        coursesRemoved: [action.payload, ...state.coursesRemoved],
      };

    case DELETE_COURSE_FROM_HISTORY:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case DELETE_COURSE_FROM_NECESSARY:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case FETCH_COURSES_INFOS:
      return {
        ...state,
        coursesInfos: action.payload,
      };
    case ADD_COURSE_TO_HISTORY:
      return {
        ...state,
        historyCourses: [action.payload, ...state.historyCourses],
      };
    case ADD_COURSE_TO_NECESSARY:
      return {
        ...state,
        necessaryCourses: [action.payload, ...state.necessaryCourses],
      };
    case MODIFY_CURRENT_COURSE:
      return {
        ...state,
        currentModifiedCourses: [
          action.payload,
          ...state.currentModifiedCourses,
        ],
      };
    case RENEW_CURRENT_COURSE:
      return {
        ...state,
        renewCourses: [action.payload, ...state.renewCourses],
      };

    case ADD_NEW_COURSE:
      return {
        ...state,
        newCourses: [action.payload, ...state.newCourses],
      };
    case MODIFY_FROM_CURRENT_TO_HISTORY:
      return {
        ...state,
        modifiedFromCurrentToHistory: [
          action.payload,
          ...state.modifiedFromCurrentToHistory,
        ],
      };
    case MODIFY_FROM_CURRENT_TO_NECESSARY:
      return {
        ...state,
        modifiedFromCurrentToNecessary: [
          action.payload,
          ...state.modifiedFromCurrentToNecessary,
        ],
      };
    case MODIFY_HISTORY_COURSE:
      return {
        ...state,
        historyModifiedCourses: [
          action.payload,
          ...state.historyModifiedCourses,
        ],
      };
    case MODIFY_FROM_HISTORY_TO_CURRENT:
      return {
        ...state,
        modifiedFromHistoryToCurrent: [
          action.payload,
          ...state.modifiedFromHistoryToCurrent,
        ],
      };
    case MODIFY_FROM_HISTORY_TO_NECESSARY:
      return {
        ...state,
        modifiedFromHistoryToNecessary: [
          action.payload,
          ...state.modifiedFromHistoryToNecessary,
        ],
      };
    case MODIFY_NECESSARY_COURSE:
      return {
        ...state,
        necessaryModifiedCourses: [
          action.payload,
          ...state.necessaryModifiedCourses,
        ],
      };
    case MODIFY_FROM_NECESSARY_TO_CURRENT:
      return {
        ...state,
        modifiedFromNecessaryToCurrent: [
          action.payload,
          ...state.modifiedFromNecessaryToCurrent,
        ],
      };
    case MODIFY_FROM_NECESSARY_TO_HISTORY:
      return {
        ...state,
        modifiedFromNecessaryToHistory: [
          action.payload,
          ...state.modifiedFromNecessaryToHistory,
        ],
      };
    case FETCH_COURSES_OF_COLLABORATOR:
      return {
        ...state,
        coursesOfCollaborator: action.payload,
      };
    case FETCH_COURSES_DATES:
      console.log("FETCH_COURSES_DATES");
      return {
        ...state,
        dates: action.payload,
      };
    case FETCH_NECESSARY_COURSES_OF_QUALIFICATION:
      console.log("sono nel reduceeeeeeeeeeeeeeeeeeeeer");
      return {
        ...state,
        necessaryCoursesOfQualification: action.payload,
      };
    case ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION:
      return {
        ...state,
        coursesAddedFromQualification: [
          action.payload,
          ...state.coursesAddedFromQualification,
        ],
      };
    case GET_MIN_CERTIFICATIONS:
      return {
        ...state,
        minCertifications: [action.payload, ...state.minCertifications],
      };
    default:
      return state;
  }
}
