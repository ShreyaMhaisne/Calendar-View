import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "neutral", value: "#f4f4f5" },
        { name: "dark", value: "#18181b" },
      ],
    },
    a11y: { manual: false },
  },
};

export default preview;
