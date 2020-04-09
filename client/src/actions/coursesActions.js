import axios from "axios";
import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES_INFOS,
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

// export const addCourse = (course) => (dispatch) => {
//   axios.post("/courses/addCourse", course).then((res) =>
//     dispatch({
//       type: ADD_COURSE,
//       payload: res.data,
//     })
//   );
//   // .catch(err =>
//   //   dispatch(returnErrors(err.response.data, err.response.status))
//   // );
// };

// export const deleteCourse = (id) => (dispatch) => {
//   axios.delete(`/courses/${id}`).then((res) =>
//     dispatch({
//       type: DELETE_COURSE,
//       payload: id,
//     })
//   );
//   // .catch(err =>
//   //   dispatch(returnErrors(err.response.data, err.response.status))
//   // );
// };

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
