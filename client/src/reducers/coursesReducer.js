import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES_INFOS,
} from "../actions/types";

const initialState = {
  courses: [],
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
    default:
      return state;
  }
}
