import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES_INFOS,
  ADD_COURSE_TO_HISTORY,
  ADD_COURSE_TO_NECESSARY,
  DELETE_COURSE_FROM_HISTORY,
  DELETE_COURSE_FROM_NECESSARY,
} from "../actions/types";

const initialState = {
  courses: [],
  historyCourses: [],
  necessaryCourses: [],
  coursesInfos: [],
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
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
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
    default:
      return state;
  }
}
