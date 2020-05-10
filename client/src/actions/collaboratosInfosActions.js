import axios from "axios";
import { FETCH_COLLABORATORS_INFOS } from "./types";

export const fetchCollaboratorsInfos = () => (dispatch) => {
  console.log("fetchCollaboratorsInfos");
  axios
    .get("/collaboratorsInfos")
    .then((res) =>
      dispatch({
        type: FETCH_COLLABORATORS_INFOS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCollaboratorsData = () => (dispatch) => {
  console.log("fetchCollaboratorsData");
  axios
    .get("/collaboratorsInfos/collaborators")
    .then((res) =>
      dispatch({
        type: FETCH_COLLABORATORS_INFOS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
