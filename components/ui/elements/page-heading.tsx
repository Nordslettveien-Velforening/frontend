import { chakra } from "@chakra-ui/react";

const PageHeading = chakra("h1", {
    baseStyle: {
        fontFamily: "Poppins",
        fontSize: "3rem",
        lineHeight: "3.5rem",
        color: "purple.700",
        fontWeight: "bold"
    }
})

export default PageHeading;
