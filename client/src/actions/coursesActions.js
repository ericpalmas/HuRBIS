import axios from "axios";
import { FETCH_COURSES, ADD_COURSE } from "./types";

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

export const addCourse = course => dispatch => {
  axios.post("/courses/addCourse", course).then(res =>
    dispatch({
      type: ADD_COURSE,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // );
};
