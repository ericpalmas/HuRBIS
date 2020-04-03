import axios from "axios";
import { FETCH_QUALIFICATIONS_INFOS } from "./types";

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
