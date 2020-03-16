import axios from "axios";
import { FETCH_COLLABORATORS } from "./types";

// Facciamo un dispatch al reducers delle informazioni
export const fetchCollaborators = () => dispatch => {
  console.log("Fetching");
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
