import React from "react";
import { useNextSanityImage } from 'next-sanity-image';
import Img from "next/image"
import { cdnClient } from "../../integrations/sanityClient";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

interface ImageProps {
    sanityImage: SanityImageSource,
    caption?: string
}

export default function Image({sanityImage, caption = ""}: ImageProps) {
    const imageProps = useNextSanityImage(cdnClient, sanityImage);
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        // TODO: Håndter responsivitet
        <>
            <Box as="figure" my={4} onClick={onOpen}>
                <Img {...imageProps} sizes="(max-width: 800px) 100vw, 800px"/>
                <Box as="figcaption" color="gray.600" fontStyle="italic" fontSize="sm">{caption}</Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{caption}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Img {...imageProps} sizes="(max-width: 800px) 100vw, 800px"/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
