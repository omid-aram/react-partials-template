
export const actionTypes = {
  success: "[successMessage] Action",
  error: "[errorMessage] Action",
  info: "[infoMessage] Action",
  warning: "[warningMessage] Action",
  clear: "[clearMessage] Action",
};

const initialState = {
  type: null,
  message: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.success: {
      return { type: "success", message: action.message };
    }
    case actionTypes.error: {
      return { type: "error", message: action.message };
    }
    case actionTypes.warning: {
      return { type: "warning", message: action.message };
    }
    case actionTypes.info: {
      return { type: "info", message: action.message };
    }
    case actionTypes.clear: {
      return { type: null, message: null };
    }
    default:
      return state;
  }
}

export const snackbarActions = {
  success: (message) => ({ type: actionTypes.success, message }),
  error: (message) => ({ type: actionTypes.error, message }),
  info: (message) => ({ type: actionTypes.info, message }),
  warning: (message) => ({ type: actionTypes.warning, message }),
  clear: () => ({ type: actionTypes.clear }),
};
