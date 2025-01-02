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
export const addAnnonce = (annonce) => {
    return async (dispatch) => {
        dispatch({ type: "ADD_ANNONCE_REQUEST", payload: annonce });
        const apiUrl = `${config.API_URL}${
              config.port ? `:${config.port}` : ""
            }/annonces`;

        try {
            const response = await axios.post(apiUrl, annonce);
            console.log("response:", response);
            if (response.data && response.data.access_token) {
                console.log("success response: ",response.data);
                dispatch({ type: "ADD_ANNONCE_SUCCESS", payload: response.data });
            } else {
                dispatch({
                    type: "ADD_ANNONCE_FAILURE",
                    payload: "Unexpected response from server",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            dispatch({
                type: "ADD_ANNONCE_FAILURE",
                payload:
                    error.response?.data?.message || "An error occurred during login",
            });
        }
    }
}

// View Annonces
export const viewAnnonce = () => {
    return async (dispatch) => {
        dispatch({ type: "VIEW_ANNONCE_REQUEST" });
        const apiUrl = `${config.API_URL}${
              config.port ? `:${config.port}` : ""
            }/annonces`;

        try {
            const response = await axios.get(apiUrl);
            console.log("response:", response);
            if (response.data && response.data.access_token) {
                console.log("success response: ",response.data);
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
    }
}