import React from "react";
import { formatDistanceToNow } from 'date-fns'
import { nb } from 'date-fns/locale'
import { Box } from "@chakra-ui/react";

const StreamDate = ({postedDate}: {postedDate: Date}) => {
    const timestamp = formatDistanceToNow(postedDate, { locale: nb })
    return (
        <Box
            as="time"
            dateTime={postedDate.toISOString()}
            color="gray.500"
            fontSize="sm"
        >
            {timestamp} siden
        </Box>
    )
}

export default StreamDate
