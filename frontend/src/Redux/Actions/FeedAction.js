import {
  UPLOAD_MEDIA_ARRAY,
  GET_ALL_POST,
  CREATE_POST,
  SUCCESS_TOAST,
  ERROR_TOAST,
  // UPLOAD_IMAGES,
} from "./types";
import axios from "axios";
export const UploadImages = (data) => async (dispatch) => {
  dispatch({
    type: UPLOAD_MEDIA_ARRAY,
    payload: data,
  });
};

export const getAllPost = (data) => async (dispatch) => {
  await axios
    .get(`/api/post`)
    .then((response) => {
      // console.log(response.data.response);
      dispatch({
        type: GET_ALL_POST,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      window.localStorage.clear();
      window.location.reload();
      console.log(error);
    });
};

export const createPost = (value) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/post`, { text: value });
    if (data.status === "posted") {
      dispatch({
        type: SUCCESS_TOAST,
        payload: "Posted 😄😃 !!",
      });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: FeedAction.js ~ line 36 ~ createPost ~ error",
      error
    );
  }
};

export const uploadMedia = (value, images) => async (dispatch) => {
  try {
    const formData = new FormData();
    const { data } = await axios.post(`/api/post`, { text: value });
    if (data.postId) {
      const file = [];
      for (let i = 0; i < images.length; i++) {
        file[i] = new File(
          [images[i]],
          `${data.postId}+${Date.now()}+${images[i].name}`
        );
      }
      for (let i = 0; i < file.length; i++) {
        formData.append("myFile[]", file[i]);
      }
      formData.append("postID", data.postId);

      const response = await axios.post("/api/uploadMedia", formData);
      if (response.data.status === "uploaded") {
        dispatch({
          type: SUCCESS_TOAST,
          payload: "Posted 😄😃!!",
        });
      } else {
        dispatch({
          type: ERROR_TOAST,
          payload: "Upload Failed 😑",
        });
      }
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: FeedAction.js ~ line 58 ~ uploadMedia ~ error",
      error
    );
  }
};
