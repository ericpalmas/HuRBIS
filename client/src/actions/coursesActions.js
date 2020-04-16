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
  MODIFY_CURRENT_COURSE,
  // MODIFY_FROM_CURRENT_TO_HISTORY,
  // MODIFY_FROM_CURRENT_TO_NECESSARY,
  // MODIFY_HISTORY_COURSE,
  // MODIFY_FROM_HISTORY_TO_CURRENT,
  // MODIFY_FROM_HISTORY_TO_NECESSARY,
  // MODIFY_NECESSARY_COURSE,
  // MODIFY_FROM_NECESSARY_TO_CURRENT,
  // MODIFY_FROM_NECESSARY_TO_HISTORY,
  FETCH_COURSES_OF_COLLABORATOR,
  FETCH_COLLABORATOR_INFOS,
} from "./types";

export const addCourse = (course) => (dispatch) => {
  axios.post("/courses/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    })
  );
};

export const addCourseToHistory = (course) => (dispatch) => {
  axios.post("/coursesHistory/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE_TO_HISTORY,
      payload: res.data,
    })
  );
};

export const addCourseToNecessary = (course) => (dispatch) => {
  axios.post("/necessaryCourses/addCourse", course).then((res) =>
    dispatch({
      type: ADD_COURSE_TO_NECESSARY,
      payload: res.data,
    })
  );
};

export const deleteCourse = (removedCourse) => (dispatch) => {
  axios.post(`/courses/`, removedCourse).then((res) =>
    dispatch({
      type: DELETE_COURSE,
      payload: res.data,
    })
  );
};

// export const deleteCourseFromHistory = (id) => (dispatch) => {
//   axios.delete(`/coursesHistory/${id}`).then((res) =>
//     dispatch({
//       type: DELETE_COURSE_FROM_HISTORY,
//       payload: id,
//     })
//   );
// };

// export const deleteCourseFromNecessary = (id) => (dispatch) => {
//   axios.delete(`/necessaryCourses/${id}`).then((res) =>
//     dispatch({
//       type: DELETE_COURSE_FROM_NECESSARY,
//       payload: id,
//     })
//   );
// };

export const fetchCoursesInformations = () => (dispatch) => {
  console.log("sono qua");
  axios.get("/coursesInformations").then((res) =>
    dispatch({
      type: FETCH_COURSES_INFOS,
      payload: res.data,
    })
  );
};

export const fetchCourses = () => (dispatch) => {
  console.log("sono qua");
  axios.get("/courses").then((res) =>
    dispatch({
      type: FETCH_COURSES,
      payload: res.data,
    })
  );
};

export const modifyCourse = (course) => (dispatch) => {
  axios.post(`/courses/modifyCourse`, course).then((res) =>
    dispatch({
      type: MODIFY_CURRENT_COURSE,
      payload: res.data,
    })
  );
};

// export const modifyFromCurrentToHistory = (course, id) => (dispatch) => {
//   console.log("modifyFromCurrentToHistory");
//   axios.post(`/courses/modifyFromCurrentToHistory/${id}`, course).then((res) =>
//     dispatch({
//       type: MODIFY_FROM_CURRENT_TO_HISTORY,
//       payload: res.data,
//     })
//   );
// };

// export const modifyFromCurrentToNecessary = (course, id) => (dispatch) => {
//   console.log("modifyFromCurrentToNecessary");
//   axios
//     .post(`/courses/modifyFromCurrentToNecessary/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_FROM_CURRENT_TO_NECESSARY,
//         payload: res.data,
//       })
//     );
// };

////////////
///////////

// export const modifyHistoryCourse = (course, id) => (dispatch) => {
//   console.log("modifyHistoryCourse");
//   axios.post(`/coursesHistory/modifyHistoryCourse/${id}`, course).then((res) =>
//     dispatch({
//       type: MODIFY_HISTORY_COURSE,
//       payload: res.data,
//     })
//   );
// };

// export const modifyFromHistoryToCurrent = (course, id) => (dispatch) => {
//   console.log("modifyFromHistoryToCurrent");
//   axios
//     .post(`/coursesHistory/modifyFromHistoryToCurrent/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_FROM_HISTORY_TO_CURRENT,
//         payload: res.data,
//       })
//     );
// };

// export const modifyFromHistoryToNecessary = (course, id) => (dispatch) => {
//   console.log("modifyFromHistoryToNecessary");
//   axios
//     .post(`/coursesHistory/modifyFromHistoryToNecessary/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_FROM_HISTORY_TO_NECESSARY,
//         payload: res.data,
//       })
//     );
// };

////////////////////
////////////////////

// export const modifyNecessaryCourse = (course, id) => (dispatch) => {
//   console.log("modifyNecessaryCourse");
//   axios
//     .post(`/necessaryCourses/modifyNecessaryCourse/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_NECESSARY_COURSE,
//         payload: res.data,
//       })
//     );
// };

// export const modifyFromNecessaryToCurrent = (course, id) => (dispatch) => {
//   console.log("modifyFromNecessaryToCurrent");
//   axios
//     .post(`/necessaryCourses/modifyFromNecessaryToCurrent/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_FROM_NECESSARY_TO_CURRENT,
//         payload: res.data,
//       })
//     );
// };

// export const modifyFromNecessaryToHistory = (course, id) => (dispatch) => {
//   console.log("modifyFromNecessaryToHistory");
//   axios
//     .post(`/necessaryCourses/modifyFromNecessaryToHistory/${id}`, course)
//     .then((res) =>
//       dispatch({
//         type: MODIFY_FROM_NECESSARY_TO_HISTORY,
//         payload: res.data,
//       })
//     );
// };

/////////////////////
/////////////////////
// Get qualification

export const fetchCoursesOfCollaborator = (id) => async (dispatch) => {
  const res = await axios.get(`/courses/${id}`);
  dispatch({
    type: FETCH_COURSES_OF_COLLABORATOR,
    payload: res.data,
  });
};
