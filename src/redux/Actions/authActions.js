import axios from 'axios';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types d'action
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT = 'LOGOUT';



// Action creator pour le login
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const apiUrl = `${config.BASE_URL}/authent/login`;

    try {
      const response = await axios.post(apiUrl, { username, password });

      if (response.data && response.data.access_token) {
        const decodedToken = JSON.parse(atob(response.data.access_token.split('.')[1]));
        const userId = decodedToken.sub;
        await AsyncStorage.setItem('userId', userId.toString());
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: response.data.access_token,
            id: userId
          },
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Email ou Mot de passe incorrect',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Erreur lors de la connexion',
      });
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    const apiUrl = `${config.BASE_URL}/authent/addUser`;

    try {
      const response = await axios.post(apiUrl, userData);

      if (response.data) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data.message || 'Inscription réussie !',
        });
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          payload: 'Email ou Téléphone déjà utilisé',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data?.message || 'Erreur lors de l\'inscription',
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      // Supprimer les données utilisateur stockées localement
      await AsyncStorage.removeItem('userId');
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Erreur lors du logout:', error);
    }
  };
};