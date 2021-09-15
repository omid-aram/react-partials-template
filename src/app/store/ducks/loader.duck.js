
export const actionTypes = {
  show: "[showLoader] Action",
  hide: "[hideLoader] Action",
};

const initialState = {
  isShowing: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.show: {
      return { isShowing: true };
    }
    case actionTypes.hide: {
      return { isShowing: false };
    }
    default:
      return state;
  }
}

export const loaderActions = {
  show: () => ({ type: actionTypes.show }),
  hide: () => ({ type: actionTypes.hide }),
};
