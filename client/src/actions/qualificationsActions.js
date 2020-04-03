import axios from "axios";
import { FETCH_QUALIFICATIONS, FETCH_QUALIFICATIONS_INFOS } from "./types";

// Facciamo un dispatch al reducers delle informazioni
export const fetchQualifications = () => dispatch => {
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

export const fetchQualificationsInformations = () => dispatch => {
  axios.get("/qualifications/informations").then(res =>
    dispatch({
      type: FETCH_QUALIFICATIONS_INFOS,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
