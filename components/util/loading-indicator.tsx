import React from "react";
import { Spinner } from "@chakra-ui/react";

type LoadingIndicatorProps = {
    size?: string
}

const LoadingIndicator = ({ size = "md" }: LoadingIndicatorProps) => (
    <Spinner size={size} color="purple.700" thickness="4px"/>
);

export default LoadingIndicator;
