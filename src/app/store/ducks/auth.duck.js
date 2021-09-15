import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../services/auth.service";

export const actionTypes = {
  Login: "[DEV Login] Action",
  Logout: "[DEV Logout] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  expireDate:undefined
};

export const reducer = persistReducer(
  { storage, key: "auth", whitelist: ["user", "authToken", "expireDate"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        return {
          authToken: action.payload.authToken,
          user: action.payload.user,
          expireDate: new Date(action.payload.expireDate).getTime()
        };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }

      default:
        return state;
    }
  }
);

export const debugAuthActions = {
  login: loginData => ({ type: actionTypes.Login, payload: loginData }),
  logout: () => ({ type: actionTypes.Logout }),
};

