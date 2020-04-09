import axios from "axios";
import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  DELETE_COURSE_FROM_HISTORY,
  FETCH_COURSES_INFOS,
  ADD_COURSE_TO_HISTORY,
  ADD_COURSE_TO_NECESSARY,
  DELETE_COURSE_FROM_NECESSARY,
} from "./types";

// Facciamo un dispatch al reducers delle informazioni
// export const fetchCourses = () => (dispatch) => {
//   console.log("Fetching courses");
//   axios.get("/courses").then((res) =>
//     dispatch({
//       type: FETCH_COURSES,
//       payload: res.data,
//     })
//   );
//   // .catch(err =>
//   //   dispatch(returnErrors(err.response.data, err.response.status))
//   // );
// };

export const addCourse = (course) => (dispatch) => {
  axios.post("/courses/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};

export const addCourseToHistory = (course) => (dispatch) => {
  axios.post("/coursesHistory/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE_TO_HISTORY,
      payload: res.data,
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};

export const addCourseToNecessary = (course) => (dispatch) => {
  axios.post("/necessaryCourses/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE_TO_NECESSARY,
      payload: res.data,
    })
  );
};

export const deleteCourse = (id) => (dispatch) => {
  axios.delete(`/courses/${id}`).then((res) =>
    dispatch({
      type: DELETE_COURSE,
      payload: id,
    })
  );
};

export const deleteCourseFromHistory = (id) => (dispatch) => {
  axios.delete(`/coursesHistory/${id}`).then((res) =>
    dispatch({
      type: DELETE_COURSE_FROM_HISTORY,
      payload: id,
    })
  );
};

export const deleteCourseFromNecessary = (id) => (dispatch) => {
  axios.delete(`/necessaryCourses/${id}`).then((res) =>
    dispatch({
      type: DELETE_COURSE_FROM_NECESSARY,
      payload: id,
    })
  );
};

export const fetchCoursesInformations = () => (dispatch) => {
  console.log("sono qua");
  axios.get("/coursesInformations").then((res) =>
    dispatch({
      type: FETCH_COURSES_INFOS,
      payload: res.data,
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
