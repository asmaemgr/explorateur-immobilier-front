const initialState = {
  isLoading: false,
  annonces: [],
  error: null,
};

const annonceReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};