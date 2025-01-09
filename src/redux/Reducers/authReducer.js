const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null,
  user: null,
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
        user: action.payload.user,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;