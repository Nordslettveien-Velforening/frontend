import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = {
  styles: {
    global: {
      h1: {
        fontFamily: "Poppins",
        fontSize: "3rem",
        lineHeight: "3rem",
        color: "purple.700",
        marginBottom: "1rem",
        fontWeight: "bold"
      },
      h2: {
        fontFamily: "Poppins",
        fontSize: "2rem",
        color: "purple.700",
        marginBottom: "1rem",
        fontWeight: "bold"
      },
      h3: {
        fontFamily: "Poppins",
        fontSize: "1.5rem",
        color: "purple.700",
        marginBottom: "0.5rem",
        fontWeight: "bold"
      },
      h4: {
        fontFamily: "Poppins",
        fontSize: "1rem",
        color: "purple.700",
        fontWeight: "bold"
      },
      "p": {
        marginBottom: "1rem"
      },
      ul: {
        marginLeft: "3rem"
      }
    }
  },
  colors: {
    beige: {
      200: "#F3EFEC"
    },
    purple: {
      100: "#F4F0FF",
      300: "#B2C3FE",
      500: "#6C5DD3",
      700: "#413880"
    }
  },
  fonts: {
    body: "Heebo",
    heading: "Poppins",
    mono: "Menlo, monospace",
  },
  components: {
    Link: {
      baseStyle: {
        color: "purple.500",
        fontWeight: "bold"
      }
    }
  }
};

export default extendTheme(withDefaultColorScheme({ colorScheme: "purple" }), theme)
