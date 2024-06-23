import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { Anchor, Group, Text, useMantineTheme } from "@mantine/core";

import { selectFooterContent } from "../../store/app.slice";

export const Footer = () => {
  const theme = useMantineTheme();
  const mobileBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.xs})`
  );
  const footer = useSelector(selectFooterContent);

  return (
    footer && (
      <Group
        fz="sm"
        h="100%"
        justify={mobileBreakpoint ? "center" : "space-between"}
        gap={0}
        align="center"
        px="sm"
      >
        <Text inherit>
          {footer.caption}{" "}
          <Anchor inherit target="_blank" href="https://github.com/mapersico">
            {footer.linkCaption}
          </Anchor>
        </Text>
        <Text inherit>Copyright © 2024</Text>
      </Group>
    )
  );
};
