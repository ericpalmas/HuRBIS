import axios from "axios";
import { FETCH_QUALIFICATIONS } from "./types";

// Facciamo un dispatch al reducers delle informazioni
export const fetchQualifications = () => dispatch => {
  console.log("Fetching qualifications");
  axios.get("/qualifications").then(res =>
    dispatch({
      type: FETCH_QUALIFICATIONS,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
