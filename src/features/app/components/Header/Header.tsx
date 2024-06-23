import { useDispatch, useSelector } from "react-redux";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Button,
  FloatingPosition,
  Group,
  Image,
  Menu,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDots,
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarRightCollapseFilled,
  IconUserEdit,
} from "@tabler/icons-react";

import logo from "../../../../assets/logo.svg";
import styles from "./Header.module.css";

import {
  selectContentKey,
  selectHeaderContent,
  selectNavState,
  toggleNav,
} from "../../store/app.slice";
import {
  useGetCvByLangMutation,
  useGetLangByKeyMutation,
} from "../../store/app.api";

import { ContactModal } from "../ContactModal/ContactModal";

export const Header = () => {
  const [fetchLang] = useGetLangByKeyMutation();
  const [fetchCv] = useGetCvByLangMutation();
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const xsBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [opened, { open, close }] = useDisclosure(false);
  const header = useSelector(selectHeaderContent);
  const navOpened = useSelector(selectNavState);
  const key = useSelector(selectContentKey);

  return (
    header && (
      <>
        <ContactModal opened={opened} close={close} />
        <Group align="center" h="100%">
          <Group px="sm" align="center" gap={10}>
            <Image w={25} src={logo} alt="my-resume logo" />
            {xsBreakpoint ? (
              <>
                <Menu position={"center" as FloatingPosition} trigger="click">
                  <Menu.Target>
                    <Button
                      c="var(--mantine-color-gray-5)"
                      variant="transparent"
                      className={styles.tab}
                      fz="xs"
                    >
                      <IconDots />
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown top={35} bg="var(--mantine-color-dark-7)">
                    <Menu.Label>
                      {header.languageLabel} - {key}
                    </Menu.Label>
                    {header.languages.map((language) => (
                      <Menu.Item
                        onClick={() =>
                          key !== language.key && fetchLang(language.key)
                        }
                        fz="xs"
                        w={150}
                        key={language.key}
                      >
                        {language.label}
                      </Menu.Item>
                    ))}
                    <Menu.Divider />
                    <Menu.Item onClick={open} fz="xs">
                      {header.contactLabel}
                    </Menu.Item>
                    <Menu.Divider>
                      <Menu.Item onClick={() => fetchCv()} fz="xs">
                        {header.exportAction}
                      </Menu.Item>
                    </Menu.Divider>
                  </Menu.Dropdown>
                </Menu>
                <Button
                  c="var(--mantine-color-gray-5)"
                  variant="transparent"
                  className={styles.tab}
                  fz="xs"
                  onClick={() => dispatch(toggleNav(!navOpened))}
                >
                  {navOpened ? (
                    <IconLayoutSidebarRightCollapseFilled size={20} />
                  ) : (
                    <IconLayoutSidebarLeftCollapseFilled size={20} />
                  )}
                </Button>
              </>
            ) : (
              <>
                <Menu position={"center" as FloatingPosition} trigger="click">
                  <Menu.Target>
                    <Button
                      c="var(--mantine-color-gray-5)"
                      variant="transparent"
                      className={styles.tab}
                      fz="xs"
                    >
                      {header.languageLabel} - {key}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown top={35} bg="var(--mantine-color-dark-7)">
                    {header.languages.map((language) => (
                      <Menu.Item
                        onClick={() =>
                          key !== language.key && fetchLang(language.key)
                        }
                        fz="xs"
                        w={150}
                        key={language.key}
                      >
                        <Group>{language.label}</Group>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
                <Button
                  onClick={open}
                  c="var(--mantine-color-gray-5)"
                  variant="transparent"
                  className={styles.tab}
                  fz="xs"
                >
                  {header.contactLabel}
                </Button>
                <Button
                  c="var(--mantine-color-gray-5)"
                  variant="transparent"
                  className={styles.tab}
                  fz="xs"
                  onClick={() => fetchCv()}
                >
                  {header.exportAction}
                </Button>
              </>
            )}
          </Group>
          <Paper
            ml={{ base: 0, xs: "20%" }}
            h="70%"
            bg="#2a2a2a"
            px={{ base: "xs", md: "5rem", lg: "10rem" }}
            withBorder
          >
            <Group gap={5} align="center" justify="center" h="100%">
              <IconUserEdit size={18} />
              <Text fz="sm">{header.title}</Text>
            </Group>
          </Paper>
        </Group>
      </>
    )
  );
};
