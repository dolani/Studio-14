import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FFFFFF" },
          100: { value: "#FFFFFF" },
          200: { value: "#F5F7FA" },
          red: { value: "#F94A4A" },
          teal: { value: "#2FE0C2" },
          yellow: { value: "#FFE14D" },
          blue: { value: "#69C8F5" },
        },
        card: {
          red: { value: "#F94A4A" },
          green: { value: "#2FE0C2" },
          orange: { value: "#FFB020" },
          yellow: { value: "#FFE14D" },
          blue: { value: "#69C8F5" },
        },
        text: {
          dark: { value: "#111827" },
          medium: { value: "#6B7280" },
          light: { value: "#9CA3AF" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);
export default system;
