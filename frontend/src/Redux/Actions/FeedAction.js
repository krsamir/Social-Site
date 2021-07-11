import { UPLOAD_IMAGE, GET_ALL_POST } from "./types";
import axios from "axios";
export const UploadImages = (data) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE,
    payload: data,
  });
};

export const getAllPost = (data) => async (dispatch) => {
  await axios
    .get(`/api/post`)
    .then((response) => {
      console.log(response.data.response);
      dispatch({
        type: GET_ALL_POST,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      // window.localStorage.clear();
      // window.location.reload();
      console.log(error);
    });
};
