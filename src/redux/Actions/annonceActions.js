import axios from "axios";
import config from "../../config";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Add Actions
export const ADD_ANNONCE_REQUEST = "ADD_ANNONCE_REQUEST";
export const ADD_ANNONCE_SUCCESS = "ADD_ANNONCE_SUCCESS";
export const ADD_ANNONCE_FAILURE = "ADD_ANNONCE_FAILURE";

// View list of annonces Actions
export const VIEW_ANNONCE_REQUEST = "VIEW_ANNONCE_REQUEST";
export const VIEW_ANNONCE_SUCCESS = "VIEW_ANNONCE_SUCCESS";
export const VIEW_ANNONCE_FAILURE = "VIEW_ANNONCE_FAILURE";

// View list of annonces created by user Actions
export const VIEW_MY_ANNONCE_REQUEST = "VIEW_MY_ANNONCE_REQUEST";
export const VIEW_MY_ANNONCE_SUCCESS = "VIEW_MY_ANNONCE_SUCCESS";
export const VIEW_MY_ANNONCE_FAILURE = "VIEW_MY_ANNONCE_FAILURE";

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


// View My Annonces
export const viewMyAnnonces = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "VIEW_MY_ANNONCE_REQUEST" });
    const userId = getState().auth.userId; 
    const apiUrl = `${config.BASE_URL}/annonces/user/${userId}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        console.log("success response: ", response.data);
        dispatch({ type: "VIEW_MY_ANNONCE_SUCCESS", payload: response.data });
      } else {
        dispatch({
          type: "VIEW_MY_ANNONCE_FAILURE",
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "VIEW_MY_ANNONCE_FAILURE",
        payload:
          error.response?.data?.message || "An error occurred during login",
      });
    }
  };
};

// Update Annonce by Id Actions
export const UPDATE_ANNONCE_REQUEST = "UPDATE_ANNONCE_REQUEST";
export const UPDATE_ANNONCE_SUCCESS = "UPDATE_ANNONCE_SUCCESS";
export const UPDATE_ANNONCE_FAILURE = "UPDATE_ANNONCE_FAILURE";

// Update Annonce by Id
export const updateAnnonceById = (annonceId, formData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ANNONCE_REQUEST });

    console.log("formData: ", formData);

    const apiUrl = `${config.BASE_URL}/annonces/${annonceId}`;

    try {
      const response = await axios.put(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        dispatch({ type: UPDATE_ANNONCE_SUCCESS, payload: response.data });
        return { success: true, data: response.data };
      } else {
        const error = "Unexpected response from server";
        dispatch({ type: UPDATE_ANNONCE_FAILURE, payload: error });
        return { success: false, error };
      }
    } catch (error) {
      console.error("Error during updateAnnonce:", error);
      const errorMessage = error.response?.data?.message || "An error occurred.";
      dispatch({ type: UPDATE_ANNONCE_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };
};

// Delete Annonce by Id Actions
export const DELETE_ANNONCE_REQUEST = "DELETE_ANNONCE_REQUEST";
export const DELETE_ANNONCE_SUCCESS = "DELETE_ANNONCE_SUCCESS";
export const DELETE_ANNONCE_FAILURE = "DELETE_ANNONCE_FAILURE";


// Delete Annonce by Id
export const deleteAnnonceById = (annonceId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ANNONCE_REQUEST });
    const apiUrl = `${config.BASE_URL}/annonces/${annonceId}`;

    try {
      const response = await axios.delete(apiUrl);
      if (response.data) {
        dispatch({ type: DELETE_ANNONCE_SUCCESS, payload: response.data });
      } else {
        dispatch({
          type: DELETE_ANNONCE_FAILURE,
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: DELETE_ANNONCE_FAILURE,
        payload:
          error.response?.data?.message || "An error occurred during login",
      });
    }
  };
};


// View Favorties Annonces Actions
export const VIEW_FAVORITE_REQUEST = "VIEW_FAVORITE_REQUEST";
export const VIEW_FAVORITE_SUCCESS = "VIEW_FAVORITE_SUCCESS";
export const VIEW_FAVORITE_FAILURE = "VIEW_FAVORITE_FAILURE";

// View Favorites Annonces
export const viewFavAnnonces = () => {
  return async (dispatch, getState) => { 
    dispatch({ type: VIEW_FAVORITE_REQUEST });
    const userId = getState().auth.userId; // Access user ID properly
    const apiUrl = `${config.BASE_URL}/annonces/favorites/${userId}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        dispatch({ type: VIEW_FAVORITE_SUCCESS, payload: response.data });
      } else {
        dispatch({
          type: VIEW_FAVORITE_FAILURE,
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: VIEW_FAVORITE_FAILURE,
        payload:
          error.response?.data?.message || "An error occurred during the request",
      });
    }
  };
};



// Add or Remove Annonce from Favorites Actions
export const ADD_REMOVE_FAVORITE_REQUEST = "ADD_REMOVE_FAVORITE_REQUEST";
export const ADD_REMOVE_FAVORITE_SUCCESS = "ADD_REMOVE_FAVORITE_SUCCESS";
export const ADD_REMOVE_FAVORITE_FAILURE = "ADD_REMOVE_FAVORITE_FAILURE";

// Add or Remove Annonce from Favorites
export const toggleFavoriteAnnonce = (annonceId, isFavorite) => {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_REMOVE_FAVORITE_REQUEST });
    const userId = getState().auth.userId; 
    const apiUrl = `${config.BASE_URL}/annonces/${annonceId}/favorites/${userId}`;
    try {
      const response = await axios.post(apiUrl, { isFavorite });
      if (response.data) {
        dispatch({ type: ADD_REMOVE_FAVORITE_SUCCESS, payload: response.data });
      } else {
        dispatch({
          type: ADD_REMOVE_FAVORITE_FAILURE,
          payload: "Unexpected response from server",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: ADD_REMOVE_FAVORITE_FAILURE,
        payload:
          error.response?.data?.message || "An error occurred during the request",
      });
    }
  };
};

// Check if Annonce is in Favorites Actions
export const CHECK_FAVORITE_REQUEST = "CHECK_FAVORITE_REQUEST";
export const CHECK_FAVORITE_SUCCESS = "CHECK_FAVORITE_SUCCESS";
export const CHECK_FAVORITE_FAILURE = "CHECK_FAVORITE_FAILURE";

// Check if Annonce is in Favorites
export const isFavoriteAnnonce = (annonceId) => {
  return async (dispatch, getState) => {
    dispatch({ type: CHECK_FAVORITE_REQUEST });
    const userId = getState().auth.userId; 
    const apiUrl = `${config.BASE_URL}/annonces/${annonceId}/favorites/${userId}`;
    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        dispatch({ type: CHECK_FAVORITE_SUCCESS, payload: response.data });
        return { success: true, data: response.data };
      } else {
        const error = "Unexpected response from server";
        dispatch({ type: CHECK_FAVORITE_FAILURE, payload: error });
        return { success: false, error };
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during the request";
      dispatch({ type: CHECK_FAVORITE_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };
};
