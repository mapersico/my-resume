import { DEFAULT_THEME, createTheme } from "@mantine/core";

export const theme = createTheme({
  ...DEFAULT_THEME,
  fontFamily: "monospace",
  colors: {
    ...DEFAULT_THEME.colors,
    softGreen: [
      "#e7fcee",
      "#d8f3e2",
      "#b5e4c6",
      "#8ed4a6",
      "#6ec78d",
      "#58bf7c",
      "#4cbb73",
      "#3ba461",
      "#309254",
      "#1f7f46",
    ],
  },
});
