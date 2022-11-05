import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        p: 0,
        m: 0,
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "#ffffff",
        font: "roboto",
      },
    },
  },
  colors: {
    white: {
      100: "#FFFFFF",
      200: "#FDF9EA",
    },
    black: {
      100: "#000000",
      200: "#333333",
    },
    orange: {
      100: "#FFDABF",
      200: "#FEA801",
      300: "#FF6B00",
      600: "#FF6B00",
    },
    blue: {
      100: "#52D5F2",
      200: "#27AAC7",
      300: "#1877F2",
    },
    yellow: {
      100: "#FFF7D9",
      200: "#FFEC9F",
      300: "#FAD12B",
      400: "#FEE500",
    },
    gray: {
      100: "#F6F6F6",
      200: "#DDDDDD",
      300: "#61646B",
    },
    green: {
      100: "#03C75A",
    },
    red: {
      100: "#FF2C2C",
    },
  },
  textStyles: {
    h1: {
      fontWeight: "700",
      fontSize: "22px",
      letterSpacing: "0.01px",
      lineHeight: "24px",
    },
    h2: {
      fontWeight: "500",
      fontSize: "16px",
      letterSpacing: "0.01px",
      lineHeight: "24px",
    },
    h2_bold: {
      fontWeight: "700",
      fontSize: "16px",
      letterSpacing: "0.01px",
    },
    h3: {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.01px",
    },
    h3_bold: {
      fontWeight: "700",
      lineHeight: "24px",
      fontSize: "14px",
      letterSpacing: "0.01px",
    },
    body: {
      fontWeight: "400",
      fontSize: "15px",
      letterSpacing: "0.01px",
    },
  },
  fonts: {
    roboto: `'Roboto', cursive`,
  },
});
