const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null,
  userId: null,
};

export const authReducer = (state = initialState, action) => {
  console.log("Reducer triggered with action:", action);
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.id,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case "REGISTER_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.id,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        token: null,
        userId: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;