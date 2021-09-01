import {
  UPLOAD_MEDIA_ARRAY,
  GET_ALL_POST,
  UPLOAD_IMAGES,
  ADD_NEW_POST,
  DELETE_POST,
  REPORT_POST,
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

    case DELETE_POST:
      const data = { ...state };
      const dataArray = data.allPost;
      const index = dataArray.map((val) => val.post_id).indexOf(action.payload);
      if (index > -1) {
        dataArray.splice(index, 1);
      }
      return {
        ...state,
        allPost: [...dataArray],
      };

    case REPORT_POST:
      const dataForReport = { ...state };
      const reportData = dataForReport.allPost;
      const reportIndex = reportData
        .map((val) => val.post_id)
        .indexOf(action.payload);
      reportData[reportIndex].reportedByCurrentUser = 1;
      reportData[reportIndex].totalReports += 1;
      console.log(reportData);
      return {
        ...state,
        allPost: [...reportData],
      };

    default:
      return state;
  }
};

export default message;
