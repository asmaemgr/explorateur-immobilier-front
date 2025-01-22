const initialState = {
  isLoading: false,
  annonces: [],
  error: null,
  isFav: false,
};

export const annonceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ANNONCE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "ADD_ANNONCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: [...state.annonces, action.payload],
      };
    case "ADD_ANNONCE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "VIEW_ANNONCE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "VIEW_ANNONCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: action.payload,
      };
    case "VIEW_ANNONCE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_ANNONCE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "DELETE_ANNONCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: state.annonces.filter(
          (annonce) => annonce.id !== action.payload
        ),
      };
    case "DELETE_ANNONCE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "VIEW_MY_ANNONCE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "VIEW_MY_ANNONCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: action.payload,
      };
    case "VIEW_MY_ANNONCE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_ANNONCE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "UPDATE_ANNONCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: state.annonces.map((annonce) =>
          annonce.id === action.payload.id ? action.payload : annonce
        ),
      };
    case "UPDATE_ANNONCE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case "ADD_REMOVE_FAVORITE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "ADD_REMOVE_FAVORITE_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "ADD_REMOVE_FAVORITE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case "VIEW_FAVORITE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "VIEW_FAVORITE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        annonces: action.payload,
      };
    case "VIEW_FAVORITE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CHECK_FAVORITE_REQUEST":
      return { ...state, isLoading: true, error: null, isFav: false };
    case "CHECK_FAVORITE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isFav: action.payload.isFavorite
      };
    case "CHECK_FAVORITE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isFav: false
      };
    default:
      return state;
  }
};

export default annonceReducer;