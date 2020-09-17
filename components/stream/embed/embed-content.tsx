import React from "react";
import { Box, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";


const EmbedImage = ({images}) => {
    return images && images.length > 0  &&
        <Image
            src={images[0].url}
            alt=""
            width="100%"
            objectFit="cover"
        />
}

const RichEmbed = ({data}) => {
    return (
        <LinkBox fontSize="sm">
            <EmbedImage images={data.images} />
            <Box px={4} py={2} backgroundColor="gray.100">
                <Text color="gray.500" mb={0}>{data.site}</Text>
                <LinkOverlay href={data.url} isExternal fontWeight="bold">{data.title}</LinkOverlay>
                <Text mb={0}>{data.description}</Text>
            </Box>
        </LinkBox>
    )
}

// TODO: Implementer alle typer. Se https://github.com/embed-rocks/embed-example-2/blob/master/views/card.html for inspirasjon

const EmbedContent = ({data}) => {

    const renderEmbed = () => {
        switch (data.type) {
            case "rich": return <RichEmbed data={data}/>;
            default: return null;
        }
    }

    return (
        <Box mt={4}>
            { renderEmbed() }
        </Box>
    )
}

export default EmbedContent



