import axios from "axios";
import {
  FETCH_COLLABORATORS,
  ADD_COLLABORATOR,
  DELETE_COLLABORATOR,
  FETCH_COLLABORATOR_INFOS,
} from "./types";

export const fetchCollaborators = () => (dispatch) => {
  axios.get("/collaborators").then((res) =>
    dispatch({
      type: FETCH_COLLABORATORS,
      payload: res.data,
    })
  );
};

export const addCollaborator = (newCollaborator) => (dispatch) => {
  axios.post("/collaborators/", newCollaborator).then((res) =>
    dispatch({
      type: ADD_COLLABORATOR,
      payload: res.data,
    })
  );
};

export const deleteCollaborator = (id) => (dispatch) => {
  axios.delete(`/collaborators/${id}`).then((res) =>
    dispatch({
      type: DELETE_COLLABORATOR,
      payload: id,
    })
  );
};

export const fetchCollaboratorInfos = (id) => async (dispatch) => {
  // console.log("fetchCollaboratorInfos");
  const res = await axios.get(`/collaborators/infos/${id}`);
  // console.log(res);
  dispatch({
    type: FETCH_COLLABORATOR_INFOS,
    payload: res.data,
  });
};
