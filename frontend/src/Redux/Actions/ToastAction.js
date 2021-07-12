import { SUCCESS_TOAST, WARNING_TOAST, ERROR_TOAST } from "./types";

export const successToast = (message) => async (dispatch) => {
  dispatch({
    type: SUCCESS_TOAST,
    payload: message + "  😄😃 ",
  });
};

export const warningToast = (message) => async (dispatch) => {
  dispatch({
    type: WARNING_TOAST,
    payload: message + "  😬",
  });
};

export const ErrorToast = (message) => async (dispatch) => {
  dispatch({
    type: ERROR_TOAST,
    payload: message + "  😑",
  });
};
