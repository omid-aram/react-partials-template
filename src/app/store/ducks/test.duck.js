
export const actionTypes = {
  add: "[testadd] Action",
};

const initialState = {
  count: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.add: {
      return { count : state.count+ 1};
    }
    default:
      return state;
  }
}

export const testActions = {
  add: () => ({ type: actionTypes.add }),
};
