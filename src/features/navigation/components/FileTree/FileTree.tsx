import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Group,
  RenderTreeNodePayload,
  Text,
  Tree,
  TreeNodeData,
  useTree,
} from "@mantine/core";
import {
  IconBraces,
  IconBracketsAngle,
  IconBrandReact,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

import styles from "../Navigation/Navigation.module.css";
import { toggleNav } from "../../../app/store/app.slice";

interface FileTreeProps {
  treeData: TreeNodeData[];
}

export const FileTree: FC<FileTreeProps> = ({ treeData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tree = useTree();

  useEffect(() => {
    tree.clearSelected();
    if (treeData) {
      tree.expandAllNodes();
    }
  }, [treeData]);

  const renderNodeIcon = (
    expanded: boolean,
    children: TreeNodeData[] | undefined,
    fileName: string
  ) => {
    if (children && children.length) {
      return expanded ? (
        <IconChevronDown size={14} />
      ) : (
        <IconChevronRight size={14} />
      );
    }
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

  const getLink = (value: string) => {
    const valueSplit = value.split("/");
    if (value.includes("career") || value.includes("freelance")) {
      return `/${valueSplit[valueSplit.length - 2].toLowerCase()}/${valueSplit[
        valueSplit.length - 1
      ].toLowerCase()}`;
    }
    return `/${valueSplit[valueSplit.length - 1].toLowerCase()}`;
  };

  const renderLeaf = ({
    node,
    expanded,
    elementProps,
  }: RenderTreeNodePayload) => {
    const isSection = node.label?.toString().includes(".");

    return isSection ? (
      <Group
        w="100%"
        pb="4px"
        fz="sm"
        {...elementProps}
        onClick={() => {
          navigate(getLink(node.value));
          dispatch(toggleNav());
        }}
      >
        <Group w="100%" gap={5} className={styles.leaf}>
          {renderNodeIcon(
            expanded,
            node.children,
            node.label?.toString() || ""
          )}
          {renderNodeName(node.label?.toString() || "")}
        </Group>
      </Group>
    ) : (
      <Group w="100%" pb="4px" fz="sm" {...elementProps}>
        <Group w="100%" gap={5} className={styles.leaf}>
          {renderNodeIcon(
            expanded,
            node.children,
            node.label?.toString() || ""
          )}
          {renderNodeName(node.label?.toString() || "")}
        </Group>
      </Group>
    );
  };

  return (
    <Tree
      tree={tree}
      data={treeData}
      renderNode={(payload) => renderLeaf(payload)}
    />
  );
};
