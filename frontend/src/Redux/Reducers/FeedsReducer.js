import { UPLOAD_IMAGE, GET_ALL_POST } from "../Actions/types";

const initialState = {
  images: [],
  allPost: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        images: action.payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        allPost: action.payload,
      };

    default:
      return state;
  }
};

export default message;
