import { FC, PropsWithChildren, useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Group, ScrollArea, Stack } from "@mantine/core";

import App from "./App";

import { TabView } from "../TabView/TabView";
import { Profile } from "../../../main/components/Profile/Profile";
import { Skills } from "../../../main/components/Skills/Skills";
import { Fullview } from "../../../main/components/Fullview/Fullview";
import { ApplicationWrapper } from "../../../main/components/Application/ApplicationWrapper";
import { JobWrapper } from "../../../main/components/Job/JobWrapper";

import { store } from "../../../store";
import { appApi } from "../../store/app.api";

const WithWrapper = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <Stack gap={0}>
        <TabView />
        <ScrollArea h="calc(100vh - 102px)">
          <Group gap={0}>{children}</Group>
        </ScrollArea>
      </Stack>
    </App>
  );
};

const router = createBrowserRouter([
  {
    path: "/fullview",
    element: (
      <WithWrapper>
        <Fullview />
      </WithWrapper>
    ),
  },
  {
    path: "/profile",
    element: (
      <WithWrapper>
        <Profile />
      </WithWrapper>
    ),
  },
  {
    path: "/skills",
    element: (
      <WithWrapper>
        <Skills />
      </WithWrapper>
    ),
  },
  {
    path: "/career/:jobCode",
    element: (
      <WithWrapper>
        <JobWrapper />
      </WithWrapper>
    ),
  },
  {
    path: "/freelance/:appCode",
    element: (
      <WithWrapper>
        <ApplicationWrapper />
      </WithWrapper>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/profile" />,
  },
  {
    path: "*",
    element: <Navigate to="/profile" />,
  },
]);

export const AppRouter: FC = () => {
  useEffect(() => {
    store.dispatch(
      appApi.endpoints.getLangByKey.initiate(
        localStorage.getItem("language") || "en"
      )
    );
  }, [store.dispatch]);

  return <RouterProvider router={router} />;
};
