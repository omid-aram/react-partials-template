/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import PagesRoute from "./app/pages/PagesRoute";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setupAxios } from "./_global";
import baseService from "./app/services/base.service";
import Axios from "axios";
import Layout from "./_global/layout/Layout";
import ThemeProvider from "./_global/layout/MaterialThemeProvider";
import { PersistGate } from "redux-persist/integration/react";

import './custom.scss';


export default function AppLocal({ store,persistor, baseUrl, baseApiUrl, theme }) {
  baseService.init(store, baseApiUrl);
  return (
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor}>
        <BrowserRouter basename={baseUrl} >
          <ThemeProvider theme={theme}>
            <Layout>
              <PagesRoute baseUrl={baseUrl} />
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
