import { useDispatch, useSelector } from "react-redux";
import {
  Anchor,
  Box,
  Flex,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconCopy,
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarRightCollapseFilled,
} from "@tabler/icons-react";

import {
  selectNavState,
  selectNavigationContent,
  toggleNav,
} from "../../../app/store/app.slice";

import styles from "./Navigation.module.css";

import { FileTree } from "../FileTree/FileTree";

export const Navigation = () => {
  const dispatch = useDispatch();
  const navOpened = useSelector(selectNavState);
  const navigation = useSelector(selectNavigationContent);
  const theme = useMantineTheme();
  const xsBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    navigation && (
      <Group h="100%" gap={5} align="flex-start">
        <Paper w={50} className={styles.tabs} bg="dark" h="100%">
          <Stack h="100%" justify="space-between">
            <Tabs value="root" orientation="vertical">
              <Tabs.List style={{ border: "none" }}>
                <Tabs.Tab w={50} className={styles.tab} value="root">
                  <IconCopy size={20} />
                </Tabs.Tab>
                {!xsBreakpoint && (
                  <Tabs.Tab
                    onClick={() => dispatch(toggleNav(!navOpened))}
                    w={50}
                    className={styles.tab}
                    value="toggleMenu"
                  >
                    {navOpened ? (
                      <IconLayoutSidebarLeftCollapseFilled size={20} />
                    ) : (
                      <IconLayoutSidebarRightCollapseFilled size={20} />
                    )}
                  </Tabs.Tab>
                )}
              </Tabs.List>
            </Tabs>
            <Stack pb="20" align="center">
              <Anchor
                href="https://github.com/mapersico"
                target="_blank"
                className={styles.socials}
              >
                <IconBrandGithubFilled />
              </Anchor>
              <Anchor
                href="https://www.linkedin.com/in/marco-p%C3%A9rsico-05b223157/"
                target="_blank"
                className={styles.socials}
              >
                <IconBrandLinkedin />
              </Anchor>
              <Anchor
                href="https://discordapp.com/users/235558030127792130"
                target="_blank"
                className={styles.socials}
              >
                <IconBrandDiscordFilled />
              </Anchor>
            </Stack>
          </Stack>
        </Paper>
        {(navOpened || xsBreakpoint) && (
          <Box py="sm" h="100%">
            <Flex w="100%" justify="flex-start" align="center">
              <Text pl="lg" pb="xs" fw="bold" fz="sm">
                {navigation.title}
              </Text>
            </Flex>
            <FileTree treeData={navigation.tree} />
          </Box>
        )}
      </Group>
    )
  );
};
