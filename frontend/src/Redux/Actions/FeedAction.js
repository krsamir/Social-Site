import {
  UPLOAD_MEDIA_ARRAY,
  GET_ALL_POST,
  SUCCESS_TOAST,
  ERROR_TOAST,
  ADD_NEW_POST,
  DELETE_POST,
  WARNING_TOAST,
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
      dispatch({
        type: GET_ALL_POST,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      removeTokens();
      console.log(error);
    });
};

export const getPostByUser = (data) => async (dispatch) => {
  await axios
    .post(`/api/single`, { userId: data })
    .then((response) => {
      // console.log(response.data.response);
      dispatch({
        type: GET_ALL_POST,
        payload: response.data.response,
        // payload: [],
      });
    })
    .catch((error) => {
      removeTokens();
      console.log(error);
    });
};

export const createPost = (value) => async (dispatch) => {
  const newArray = {};

  try {
    const { data } = await axios.post(`/api/post`, { text: value });
    if (data.status === "posted") {
      newArray.post_id = data.postId;
      newArray.posted_by = data.postedBy;
      newArray.status = 1;
      newArray.text = value;
      newArray.media = null;
      newArray.likedByCurrentUser = 0;
      newArray.totalLikes = 0;
      newArray.parent = true;
      dispatch({
        type: ADD_NEW_POST,
        payload: newArray,
      });

      dispatch({
        type: SUCCESS_TOAST,
        payload: "Posted !! 😄😃 ",
      });
    }
  } catch (error) {
    removeTokens();
    console.log(
      "🚀 ~ file: FeedAction.js ~ line 36 ~ createPost ~ error",
      error
    );
  }
};

export const uploadMedia = (value, images) => async (dispatch) => {
  const newArray = {};
  try {
    const formData = new FormData();
    const { data } = await axios.post(`/api/post`, { text: value });
    // const data = { postedBy: "Ajay" };
    newArray.post_id = data.postId;
    newArray.posted_by = data.postedBy;
    newArray.status = 1;
    newArray.text = value;
    newArray.likedByCurrentUser = 0;
    newArray.totalLikes = 0;
    newArray.reportedByCurrentUser = 0;
    newArray.totalReports = 0;
    // For dev
    if (data.postId) {
      const file = [];
      for (let i = 0; i < images.length; i++) {
        file[i] = new File(
          [images[i]],
          `${data.postId}+${Date.now()}+${images[i].name}`
        );
      }
      const imageArray = Array.from(file).map((value) => {
        return { filename: value.name, mimetype: "application/octet-stream" };
      });
      newArray.media = imageArray;
      for (let i = 0; i < file.length; i++) {
        formData.append("myFile[]", file[i]);
      }
      formData.append("postID", data.postId);

      const response = await axios.post("/api/uploadMedia", formData);
      if (response.data.status === "uploaded") {
        setTimeout(() => {
          dispatch({
            type: ADD_NEW_POST,
            payload: newArray,
          });
        }, 1000);
        dispatch({
          type: SUCCESS_TOAST,
          payload: "Posted!! 😄😃 ",
        });
      } else {
        dispatch({
          type: ERROR_TOAST,
          payload: "Upload Failed 😑 ",
        });
      }
    }
  } catch (error) {
    removeTokens();
    console.log(
      "🚀 ~ file: FeedAction.js ~ line 58 ~ uploadMedia ~ error",
      error
    );
  }
};
// function getUniqueId(min, max) {
//   return Math.trunc(Math.random() * (max - min) + min);
// }
export const deletePost = (userID) => async (dispatch) => {
  await axios
    .delete(`/api/deleteFeed/${userID}`)
    .then((res) => {
      if (res.data.status === "deleted") {
        dispatch({
          type: SUCCESS_TOAST,
          payload: "Post Deleted Successfuly!! 😄😃 ",
        });
        // On success deletion remove the particular object from array
        dispatch({
          type: DELETE_POST,
          payload: userID,
        });
      } else {
        dispatch({
          type: WARNING_TOAST,
          payload: "Some Issue While Deleting!! 😄😃 ",
        });
      }
    })
    .catch((e) => {
      removeTokens();
      console.log("🚀 ~ file: Feed.jsx ~ line 72 ~ handleDelete ~ e", e);
    });
};

const removeTokens = () => {
  window.localStorage.clear();
  window.location.reload();
};
