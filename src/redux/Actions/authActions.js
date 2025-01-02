import axios from "axios";
import config from "../../config";

// Action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action creator pour le login
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const apiUrl = `${config.API_URL}${
      config.port ? `:${config.port}` : ""
    }/authent/login`;
    try {
      const response = await axios.post(apiUrl, { username, password });
      console.log("response:", response);
      if (response.data && response.data.access_token) {
        console.log("success response: ",response.data);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: LOGIN_FAILURE,
        payload:
          error.response?.data?.message || "An error occurred during login",
      });
    }
  };
};
