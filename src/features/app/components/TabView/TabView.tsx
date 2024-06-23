import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Group,
  ScrollArea,
  Tabs,
  Text,
  TreeNodeData,
} from "@mantine/core";
import {
  IconBraces,
  IconBracketsAngle,
  IconBrandReact,
} from "@tabler/icons-react";

import { selectNavigationContent } from "../../store/app.slice";

export const TabView: FC = () => {
  const location = useLocation();
  const navigationContent = useSelector(selectNavigationContent);
  const tabsToRender = useMemo(() => {
    function getElementsWithDot(tree: TreeNodeData[]) {
      const result: TreeNodeData[] = [];

      function traverse(node: TreeNodeData) {
        if (node.label?.toString().includes(".")) {
          result.push(node);
        }

        if (node.children) {
          for (const child of node.children) {
            traverse(child);
          }
        }
      }

      for (const node of tree) {
        traverse(node);
      }

      return result;
    }
    const elementsWithDot = getElementsWithDot(navigationContent?.tree || []);

    return elementsWithDot;
  }, [navigationContent]);

  const renderNodeIcon = (fileName: string) => {
    if (fileName.endsWith(".app")) {
      return <IconBrandReact color="var(--mantine-color-blue-3)" size={14} />;
    }
    if (fileName.endsWith(".json")) {
      return <IconBraces color="var(--mantine-color-yellow-5)" size={14} />;
    }
    if (fileName.endsWith(".txt")) {
      return (
        <IconBracketsAngle color="var(--mantine-color-orange-7)" size={14} />
      );
    }
  };

  const renderNodeName = (fileName: string) => {
    if (fileName.endsWith(".app")) {
      return (
        <Text inherit c="var(--mantine-color-blue-3)" span>
          {fileName}
        </Text>
      );
    }
    if (fileName.endsWith(".json")) {
      return (
        <Text c="#FFDD9B" inherit span>
          {fileName.split(".")[0]}
        </Text>
      );
    }
    if (fileName.endsWith(".txt")) {
      return (
        <Text c="var(--mantine-color-softGreen-4)" inherit span>
          {fileName.split(".")[0]}
        </Text>
      );
    }

    return (
      <Text fw="bold" inherit span>
        {fileName}
      </Text>
    );
  };

  const renderLeaf = (tab: TreeNodeData) => {
    return (
      <Group w="100%" fz="sm">
        <Group w="100%" gap={5}>
          {renderNodeIcon(tab.label?.toString() || "")}
          {renderNodeName(tab.label?.toString() || "")}
        </Group>
      </Group>
    );
  };

  const getLink = (value: string) => {
    const valueSplit = value.split("/");
    if (value.includes("career") || value.includes("freelance")) {
      return `/${valueSplit[valueSplit.length - 2].toLowerCase()}/${valueSplit[
        valueSplit.length - 1
      ].toLowerCase()}`;
    }
    return `/${valueSplit[valueSplit.length - 1].toLowerCase()}`;
  };

  return (
    <ScrollArea scrollbarSize="0.25rem" miw={1200} w="100%">
      <Box miw={{ base: 1900, md: 1500 }}>
        <Tabs className="main" defaultValue="gallery">
          <Tabs.List>
            {tabsToRender.map((tab) => (
              <Link
                key={tab.value}
                style={{ textDecoration: "none" }}
                to={getLink(tab.value)}
              >
                <Tabs.Tab
                  data-active={location.pathname === getLink(tab.value)}
                  value={tab.value}
                >
                  {renderLeaf(tab)}
                </Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
      </Box>
    </ScrollArea>
  );
};
