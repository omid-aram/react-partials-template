/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import PagesRoute from "./app/pages/PagesRoute";
//import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import baseService from "./app/services/base.service";
import ThemeProvider from "./_global/layout/MaterialThemeProvider";
import { appReducers } from "./app/store/rootDuck";
import { Provider } from "react-redux";

//dont add style here


export default function App({ store, theme, baseUrl, baseApiUrl, history  }) {

  baseService.init(store, baseApiUrl);
  store.injectReducers(appReducers);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history} basename={baseUrl} >
          <PagesRoute baseUrl={baseUrl} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
