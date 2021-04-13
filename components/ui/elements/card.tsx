import { chakra } from "@chakra-ui/react";

const Card = chakra("div", {
    baseStyle: {
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "2px",
        boxShadow: "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)"
    }
})

export default Card;
