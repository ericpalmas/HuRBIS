import axios from "axios";
import {
  FETCH_QUALIFICATIONS,
  FETCH_QUALIFICATIONS_OF_COLLABORATOR,
  ADD_QUALIFICATION_TO_COLLABORATOR,
  REMOVE_QUALIFICATIONS_FROM_COLLABORATOR,
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

  //   console.log(res);
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
