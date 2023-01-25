/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
// import { setupAxios } from "./_global";
import store, { persistor } from "./app/store/store";
// import App from "./App";
//import "./index.scss"; // Standard version
import "./sass/style.react.rtl.css"; // RTL version
//import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import AppLocal from "./AppLocal";
import { devTheme } from "./_global/layout/MaterialThemeProvider";
// import { persistStore } from "redux-persist";
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

if( process.env.NODE_ENV === 'development'){
/**
 * Inject metronic interceptors for axios.
 * @see https://github.com/axios/axios#interceptors
 */
}


ReactDOM.render(
  <AppLocal
    store={store}
    persistor={persistor}
    basename={PUBLIC_URL}
    baseUrl=''
    baseApiUrl='https://localhost:44336/'
    theme={devTheme}
  />
  ,
  document.getElementById("root")
);
