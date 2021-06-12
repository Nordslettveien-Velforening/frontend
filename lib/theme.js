import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = {
  styles: {
    global: {
      p: {
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
    },
    Heading: {
      baseStyle: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "purple.700",
        marginBottom: 4
      }
    },
    Spinner: {
      baseStyle: {
        color: "purple.500"
      }
    }
  }
};

export default extendTheme(withDefaultColorScheme({ colorScheme: "purple" }), theme)
