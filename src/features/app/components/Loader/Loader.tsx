import { Box } from "@mantine/core";
import { FC, useEffect, useState } from "react";

interface LoaderProps {
  pos?: "relative";
}

export const Loader: FC<LoaderProps> = ({ pos }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidth((prev) => {
        return prev + 1 > 100 ? 0 : prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      h={3}
      top={pos ? 0 : "36px"}
      w="100%"
      bg="var(--mantine-color-gray-8)"
      pos={pos || "absolute"}
    >
      <Box
        style={{ transition: "width 200ms" }}
        h={3}
        w={`${width}%`}
        bg="var(--mantine-color-blue-6)"
        pos="relative"
      />
    </Box>
  );
};
