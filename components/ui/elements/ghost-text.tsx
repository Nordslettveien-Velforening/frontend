import * as React from "react";
import { Box } from "@chakra-ui/react";

type GhostTextProps = {
    text: string
};

const GhostText = ({text}: GhostTextProps) => {
    return (
        <Box
            fontSize="xl"
            color="gray.600"
            textAlign="center"
            fontWeight="bold"
            opacity={0.5}
            mt={24}
        >
            {text}
        </Box>
    )
};

export default GhostText;
