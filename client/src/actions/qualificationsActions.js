import axios from "axios";
import {
  FETCH_QUALIFICATIONS,
  FETCH_QUALIFICATIONS_OF_COLLABORATOR,
  ADD_QUALIFICATION_TO_COLLABORATOR,
  REMOVE_QUALIFICATIONS_FROM_COLLABORATOR,
  ADD_QUALIFICATION,
  DELETE_QUALIFICATION,
} from "./types";

export const fetchQualificationsInfos = () => (dispatch) => {
  axios
    .get("/qualifications")
    .then((res) =>
      dispatch({
        type: FETCH_QUALIFICATIONS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchQualificationsOfCollaborator = (id) => async (dispatch) => {
  await axios
    .get(`/qualifications/${id}`)
    .then((res) =>
      dispatch({
        type: FETCH_QUALIFICATIONS_OF_COLLABORATOR,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addQualificationToCollaborator = (qualification) => (dispatch) => {
  axios
    .post("/qualifications/addQualificationToCollaborator", qualification)
    .then((res) =>
      dispatch({
        type: ADD_QUALIFICATION_TO_COLLABORATOR,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const removeQualificationsFromCollaborator = (listOfId) => (
  dispatch
) => {
  axios
    .post("/qualifications/removeQualifications", listOfId)
    .then(
      (res) =>
        dispatch({
          type: REMOVE_QUALIFICATIONS_FROM_COLLABORATOR,
          payload: res.data,
        }),
      window.location.reload()
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addNewQualification = (qualification) => (dispatch) => {
  axios
    .post("/qualifications/addQualification", qualification)
    .then(
      (res) =>
        dispatch({
          type: ADD_QUALIFICATION,
          payload: res.data,
        }),
      window.location.reload()
    )
    .catch((err) => {
      console.log(err);
    });
};

export const removeQualification = (listOfQualifications) => (dispatch) => {
  axios
    .post(
      `/qualifications/removeQualificationsAndCourses`,
      listOfQualifications
    )
    .then(
      (res) =>
        dispatch({
          type: DELETE_QUALIFICATION,
          payload: res.data,
        }),
      window.location.reload()
    )
    .catch((err) => {
      console.log(err);
    });
};
