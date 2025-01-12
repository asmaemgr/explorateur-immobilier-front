import axios from "axios";
import config from "../../config";

// Add Actions
export const ADD_ANNONCE_REQUEST = "ADD_ANNONCE_REQUEST";
export const ADD_ANNONCE_SUCCESS = "ADD_ANNONCE_SUCCESS";
export const ADD_ANNONCE_FAILURE = "ADD_ANNONCE_FAILURE";

// View list of annonces Actions
export const VIEW_ANNONCE_REQUEST = "VIEW_ANNONCE_REQUEST";
export const VIEW_ANNONCE_SUCCESS = "VIEW_ANNONCE_SUCCESS";
export const VIEW_ANNONCE_FAILURE = "VIEW_ANNONCE_FAILURE";

// Add Annonce
export const addAnnonce = (formData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_ANNONCE_REQUEST });
  
      const apiUrl = `${config.BASE_URL}/annonces`;
  
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.data) {
          dispatch({ type: ADD_ANNONCE_SUCCESS, payload: response.data });
          return { success: true, data: response.data };
        } else {
          const error = "Unexpected response from server";
          dispatch({ type: ADD_ANNONCE_FAILURE, payload: error });
          return { success: false, error };
        }
      } catch (error) {
        console.error("Error during addAnnonce:", error);
        const errorMessage = error.response?.data?.message || "An error occurred.";
        dispatch({ type: ADD_ANNONCE_FAILURE, payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    };
  };
  

// View Annonces
export const viewAnnonce = () => {
  return async (dispatch) => {
    dispatch({ type: "VIEW_ANNONCE_REQUEST" });
    const apiUrl = `${config.BASE_URL}/annonces`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        console.log("success response: ", response.data);
        dispatch({ type: "VIEW_ANNONCE_SUCCESS", payload: response.data });
      } else {
        dispatch({
          type: "VIEW_ANNONCE_FAILURE",
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "VIEW_ANNONCE_FAILURE",
        payload:
          error.response?.data?.message || "An error occurred during login",
      });
    }
  };
};
