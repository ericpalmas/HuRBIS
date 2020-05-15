import axios from "axios";
import {
  FETCH_COLLABORATORS,
  ADD_COLLABORATOR,
  DELETE_COLLABORATOR,
  FETCH_COLLABORATOR_INFOS,
} from "./types";

export const fetchCollaborators = () => (dispatch) => {
  axios
    .get("/collaborators")
    .then((res) =>
      dispatch({
        type: FETCH_COLLABORATORS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const addCollaborator = (newCollaborator) => (dispatch) => {
  axios
    .post("/collaborators/", newCollaborator)
    .then(
      (res) =>
        dispatch({
          type: ADD_COLLABORATOR,
          payload: res.data,
        }),
      window.location.reload()
    )
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCollaborator = (id) => (dispatch) => {
  axios
    .delete(`/collaborators/${id}`)
    .then(
      (res) =>
        dispatch({
          type: DELETE_COLLABORATOR,
          payload: id,
        }),
      window.location.reload()
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCollaboratorInfos = (id) => async (dispatch) => {
  const res = await axios.get(`/collaborators/infos/${id}`);
  dispatch({
    type: FETCH_COLLABORATOR_INFOS,
    payload: res.data,
  }).catch((err) => {
    console.log(err);
  });
};
