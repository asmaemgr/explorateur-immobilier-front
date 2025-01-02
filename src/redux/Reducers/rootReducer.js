import { combineReducers } from "redux";
import authReducer from "./authReducer";
import annonceReducer from "./annonceReducer";


const rootReducer = combineReducers({
  auth: authReducer, annonceReducer,
});


export default rootReducer;
