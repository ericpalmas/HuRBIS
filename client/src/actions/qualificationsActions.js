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
  axios.get("/qualifications").then((res) =>
    dispatch({
      type: FETCH_QUALIFICATIONS,
      payload: res.data,
    })
  );
};

// Get qualification
export const fetchQualificationsOfCollaborator = (id) => async (dispatch) => {
  const res = await axios.get(`/qualifications/${id}`);
  dispatch({
    type: FETCH_QUALIFICATIONS_OF_COLLABORATOR,
    payload: res.data,
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
    );
};

export const removeQualificationsFromCollaborator = (listOfId) => (
  dispatch
) => {
  console.log("removeQualificationsFromCollaborator");
  axios.post("/qualifications/removeQualifications", listOfId).then((res) =>
    dispatch({
      type: REMOVE_QUALIFICATIONS_FROM_COLLABORATOR,
      payload: res.data,
    })
  );
};

export const addNewQualification = (qualification) => (dispatch) => {
  console.log("addNewQualification");
  console.log(qualification);
  axios.post("/qualifications/addQualification", qualification).then((res) =>
    dispatch({
      type: ADD_QUALIFICATION,
      payload: res.data,
    })
  );
};

export const removeQualification = (listOfQualifications) => (dispatch) => {
  console.log("removeQualificationsAndCourses");
  axios
    .post(
      `/qualifications/removeQualificationsAndCourses`,
      listOfQualifications
    )
    .then((res) =>
      dispatch({
        type: DELETE_QUALIFICATION,
        payload: res.data,
      })
    );
};
