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
      },
    },
  },
  colors: {
    White: {
      100: "#FFFFFF",
      200: "#FDF9EA",
    },
    Black: "#000000",
    // 색깔 확인할 것
    Orange: {
      100: "#FF6B00",
      200: "#FEA801",
      300: "rgba(255, 107, 0, 0.3)",
      400: "#FFDABF", // orange.100이여야 함.
    },
    orange: {
      600: "#FF6B00",
    },
    blue: {
      600: "#FEA801",
    },
    Blue: {
      100: "#52D5F2",
    },
    Yellow: {
      50: "rgba(255, 229, 128, 0.3)",
      100: "rgba(255, 229, 128, 0.8)",
      200: "#FAD12B",
    },
    Gray: {
      100: "#F6F6F6",
      200: "#DDDDDD",
      300: "#61646B",
    },
    Red: {
      100: "#FF2C2C",
    },
  },
  textStyles: {
    h1: {
      fontFmily: "roboto",
      fontWeight: "700",
      fontSize: "22px",
      letterSpacing: "0.01px",
      lineHeight: "24px",
      color: "Black",
    },
    h2: {
      fontFmily: "roboto",
      fontWeight: "500",
      fontSize: "16px",
      letterSpacing: "0.01px",
      lineHeight: "24px",
    },
    h2_bold: {
      fontFmily: "roboto",
      fontWeight: "700",
      fontSize: "16px",
      letterSpacing: "0.01px",
    },
    h3: {
      fontFmily: "roboto",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.01px",
    },
    h3_bold: {
      fontFmily: "roboto",
      fontWeight: "700",
      lineHeight: "24px",
      fontSize: "14px",
      letterSpacing: "0.01px",
    },
    body: {
      fontFmily: "roboto",
      fontWeight: "400",
      fontSize: "15px",
      letterSpacing: "0.01px",
    },
  },
  fonts: {
    roboto: `'Roboto', cursive`,
  },
});
