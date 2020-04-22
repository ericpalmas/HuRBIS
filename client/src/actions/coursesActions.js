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
  ADD_NEW_COURSE,
  DELETE_COURSE_FROM_DATABASE,
  FETCH_COURSES_OF_COLLABORATOR,
  FETCH_COLLABORATOR_INFOS,
  FETCH_COURSES_DATES,
  FETCH_NECESSARY_COURSES_OF_QUALIFICATION,
  ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION,
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

export const deleteCourse = (removedCourse) => (dispatch) => {
  axios.post(`/courses/`, removedCourse).then((res) =>
    dispatch({
      type: DELETE_COURSE,
      payload: res.data,
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

export const fetchCoursesOfCollaborator = (id) => async (dispatch) => {
  const res = await axios.get(`/courses/${id}`);
  dispatch({
    type: FETCH_COURSES_OF_COLLABORATOR,
    payload: res.data,
  });
};

export const addNewCourse = (course) => (dispatch) => {
  axios.post("/courses/addNewCourse", course).then((res) =>
    dispatch({
      type: ADD_NEW_COURSE,
      payload: res.data,
    })
  );
};

export const deleteCourseFromDatabase = (id) => (dispatch) => {
  axios.delete(`/courses/${id}`).then((res) =>
    dispatch({
      type: DELETE_COURSE_FROM_DATABASE,
      payload: id,
    })
  );
};

export const fetchDates = () => (dispatch) => {
  console.log("fetchDates");
  axios.get("/dates").then((res) =>
    dispatch({
      type: FETCH_COURSES_DATES,
      payload: res.data,
    })
  );
};

export const addCoursesToCollaborator = (item) => (dispatch) => {
  axios.post("/collaboratorCourses", item).then((res) =>
    dispatch({
      type: ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION,
      payload: res.data,
    })
  );
};
