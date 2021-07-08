import { UPLOAD_IMAGE } from "../Actions/types";

const initialState = {
  images: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        images: action.payload,
      };

    default:
      return state;
  }
};

export default message;
