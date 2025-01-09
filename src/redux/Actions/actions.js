export const login = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};
export const register = () => {
  return {
    type: "REGISTER_REQUEST",
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

// Add Annonce
export const addAnnonce = (annonce) => {
  return {
    type: "ADD_ANNONCE_REQUEST",
    payload: annonce,
  };
};

// View Annonces
export const viewAnnonce = () => {
  return {
    type: "VIEW_ANNONCE_REQUEST",
  };
};

// Delete Annonce
export const deleteAnnonce = (id) => {
  return {
    type: "DELETE_ANNONCE",
    payload: id,
  };
};
