import axios from "axios";
import { FETCH_COLLABORATORS, FETCH_SINGLE_COLLABORATOR } from "./types";

// Facciamo un dispatch al reducers delle informazioni
export const fetchCollaborators = () => dispatch => {
  axios.get("/collaborators").then(res =>
    dispatch({
      type: FETCH_COLLABORATORS,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};

export const fetchSingleCollaborator = id => dispatch => {
  axios.get(`/collaborators/infos/${id}`).then(res =>
    dispatch({
      type: FETCH_SINGLE_COLLABORATOR,
      payload: id
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
