import axios from "axios";
import { FETCH_COURSES } from "./types";

// Facciamo un dispatch al reducers delle informazioni
export const fetchCourses = () => dispatch => {
  console.log("Fetching courses");
  axios.get("/courses").then(res =>
    dispatch({
      type: FETCH_COURSES,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
