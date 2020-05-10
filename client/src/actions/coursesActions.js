import axios from "axios";
import {
  FETCH_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES_INFOS,
  ADD_COURSE_TO_HISTORY,
  MODIFY_CURRENT_COURSE,
  ADD_NEW_COURSE,
  DELETE_COURSE_FROM_DATABASE,
  FETCH_COURSES_OF_COLLABORATOR,
  FETCH_COURSES_DATES,
  ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION,
  RENEW_CURRENT_COURSE,
  GET_MIN_CERTIFICATIONS,
} from "./types";

export const addCourse = (course) => (dispatch) => {
  axios
    .post("/courses/addCourse", course)
    .then((res) =>
      dispatch({
        type: ADD_COURSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addCourseToHistory = (course) => (dispatch) => {
  axios
    .post("/coursesHistory/addCourse", course)
    .then((res) =>
      dispatch({
        type: ADD_COURSE_TO_HISTORY,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCourse = (removedCourse) => (dispatch) => {
  axios
    .post(`/courses/`, removedCourse)
    .then((res) =>
      dispatch({
        type: DELETE_COURSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCoursesInformations = () => (dispatch) => {
  axios
    .get("/coursesInformations")
    .then((res) =>
      dispatch({
        type: FETCH_COURSES_INFOS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCourses = () => (dispatch) => {
  axios
    .get("/courses")
    .then((res) =>
      dispatch({
        type: FETCH_COURSES,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const modifyCourse = (course) => (dispatch) => {
  axios
    .post(`/courses/modifyCourse`, course)
    .then((res) =>
      dispatch({
        type: MODIFY_CURRENT_COURSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const renewCourse = (course) => (dispatch) => {
  axios
    .post(`/courses/renewCourse`, course)
    .then((res) =>
      dispatch({
        type: RENEW_CURRENT_COURSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCoursesOfCollaborator = (id) => async (dispatch) => {
  // const res = await axios.get(`/courses/${id}`);
  // dispatch({
  //   type: FETCH_COURSES_OF_COLLABORATOR,
  //   payload: res.data,
  // });

  await axios
    .get(`/courses/${id}`)
    .then((res) =>
      dispatch({
        type: FETCH_COURSES_OF_COLLABORATOR,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addNewCourse = (course) => (dispatch) => {
  axios
    .post("/courses/addNewCourse", course)
    .then((res) =>
      dispatch({
        type: ADD_NEW_COURSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCourseFromDatabase = (id) => (dispatch) => {
  axios
    .delete(`/courses/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_COURSE_FROM_DATABASE,
        payload: id,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchDates = () => (dispatch) => {
  axios
    .get("/dates")
    .then((res) =>
      dispatch({
        type: FETCH_COURSES_DATES,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addCoursesToCollaborator = (item) => (dispatch) => {
  axios
    .post("/collaboratorCourses", item)
    .then((res) =>
      dispatch({
        type: ADD_COURSES_TO_COLLABORATOR_FROM_QUALIFICATION,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchMinCertifications = (data) => (dispatch) => {
  axios
    .post("/courses/certifications", data)
    .then((res) =>
      dispatch({
        type: GET_MIN_CERTIFICATIONS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
