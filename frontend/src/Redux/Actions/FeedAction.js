import { UPLOAD_IMAGE } from "./types";

export const UploadImages = (data) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE,
    payload: data,
  });
};
