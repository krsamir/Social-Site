import {
  UPLOAD_MEDIA_ARRAY,
  GET_ALL_POST,
  UPLOAD_IMAGES,
  ADD_NEW_POST,
} from "../Actions/types";

const initialState = {
  images: [],
  allPost: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_MEDIA_ARRAY:
      return {
        ...state,
        images: action.payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        allPost: action.payload,
      };
    case UPLOAD_IMAGES:
      return {
        ...state,
      };
    case ADD_NEW_POST:
      const { allPost } = { ...state };
      allPost.unshift(action.payload);
      return {
        ...state,
        allPost: [...allPost],
      };

    default:
      return state;
  }
};

export default message;
