import { useSelector } from "react-redux";
import { Anchor, Group, Text } from "@mantine/core";

import { selectFooterContent } from "../../store/app.slice";

export const Footer = () => {
  const footer = useSelector(selectFooterContent);
  return (
    footer && (
      <Group fz="sm" h="100%" justify="space-between" align="center" px="sm">
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
