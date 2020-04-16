import axios from "axios";
import { FETCH_COLLABORATORS_INFOS } from "./types";

export const fetchCollaboratorsInfos = () => (dispatch) => {
  axios.get("/collaboratorsInfos").then((res) =>
    dispatch({
      type: FETCH_COLLABORATORS_INFOS,
      payload: res.data,
    })
  );
};
