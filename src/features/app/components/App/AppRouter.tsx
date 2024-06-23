import { FC, PropsWithChildren, Suspense, lazy, useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Box, Group, ScrollArea, Stack } from "@mantine/core";

import { useGetLangByKeyMutation } from "../../store/app.api";

import { Loader } from "../Loader/Loader";

import bg from "../../../../assets/bg.webp";

const App = lazy(() => import("./App"));
const TabView = lazy(() => import("../TabView/TabView"));
const Profile = lazy(() => import("../../../main/components/Profile/Profile"));
const Skills = lazy(() => import("../../../main/components/Skills/Skills"));
const Fullview = lazy(
  () => import("../../../main/components/Fullview/Fullview")
);
const ApplicationWrapper = lazy(
  () => import("../../../main/components/Application/ApplicationWrapper")
);
const JobWrapper = lazy(
  () => import("../../../main/components/Job/JobWrapper")
);

const WithWrapper = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <Stack pos="relative" gap={0}>
        <TabView />
        <Suspense fallback={<Loader />}>
          <Box
            style={{
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <ScrollArea h="calc(100vh - 102px)">
              <Group gap={0}>{children}</Group>
            </ScrollArea>
          </Box>
        </Suspense>
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
  const [fetch] = useGetLangByKeyMutation();

  useEffect(() => {
    fetch(localStorage.getItem("language") || "EN");
  }, [fetch]);

  return <RouterProvider router={router} />;
};
