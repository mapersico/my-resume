import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { AppShell, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { Header } from "../Header/Header";
import { Navigation } from "../../../navigation/components/Navigation/Navigation";
import { Footer } from "../Footer/Footer";

import { selectNavState } from "../../store/app.slice";

import BG from "../../../../assets/bg.webp";

import "./App.css";

const App = ({ children }: PropsWithChildren) => {
  const navOpened = useSelector(selectNavState);
  const theme = useMantineTheme();
  const xsBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <AppShell
      style={{ overflow: "hidden" }}
      footer={{ height: 30 }}
      header={{ height: 36 }}
      navbar={{
        breakpoint: "xs",
        width: navOpened ? (xsBreakpoint ? "100%" : 300) : 50,
        collapsed: { mobile: navOpened, desktop: false },
      }}
      withBorder
    >
      <AppShell.Header bg="var(--mantine-color-dark-8)">
        <Header />
      </AppShell.Header>
      <AppShell.Navbar
        style={{ transition: "width 200ms" }}
        bg="var(--mantine-color-dark-8)"
      >
        <Navigation />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          backgroundImage: `url(${BG})`,
        }}
        w="100%"
        bg="var(--mantine-color-dark-7)"
      >
        {children}
      </AppShell.Main>
      <AppShell.Footer bg="var(--mantine-color-dark-8)">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default App;
