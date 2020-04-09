import { FETCH_COURSES_INFOS } from "../actions/types";

const initialState = {
  coursesInfos: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES_INFOS:
      console.log(action.payload);
      return {
        ...state,
        coursesInfos: action.payload,
      };

    default:
      return state;
  }
}
