import {
  UPLOAD_MEDIA_ARRAY,
  GET_ALL_POST,
  CREATE_POST,
  UPLOAD_IMAGES,
} from "../Actions/types";

const initialState = {
  images: [],
  allPost: [],
  postId: null,
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_MEDIA_ARRAY:
      console.log(
        "🚀 ~ file: FeedsReducer.js ~ line 22 ~ message ~ action.payload",
        action.payload
      );
      return {
        ...state,
        images: action.payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        allPost: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        postId: action.payload,
      };
    case UPLOAD_IMAGES:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default message;
