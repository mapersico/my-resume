import { Box } from "@mantine/core";
import { FC, useEffect, useState } from "react";

interface ProgressBarProps {
  widthPercent: number;
  delayAnimation: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  widthPercent,
  delayAnimation,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWidth(widthPercent);
    }, delayAnimation);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [widthPercent]);

  return (
    <Box w="100%" bg="var(--mantine-color-gray-8)">
      <Box
        w={`${width}%`}
        h={7}
        style={{
          background: "var(--mantine-color-blue-8)",
          transition: "width 200ms",
        }}
      />
    </Box>
  );
};
