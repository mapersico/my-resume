import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { AppRouter } from "./features/app/components/App/AppRouter";

import { store } from "./features/store";

import { theme } from "./assets/theme";
import React from "react";

localStorage.setItem("language", localStorage.getItem("language") || "EN");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
