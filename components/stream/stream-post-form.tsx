import React, { useCallback, useState } from "react";
import getUrls from "get-urls";
import TextEditor from "../texteditor/text-editor";
import { Button, Flex, Box } from "@chakra-ui/react";
import Embeds from "./embed/embeds";

type StreamPostFormProps = {
    placeholder: string,
    onSubmit: (value: string) => void
}

const StreamPostForm = ({ placeholder, onSubmit }: StreamPostFormProps) => {

    const [postText, setPostText] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [urls, setUrls] = useState<Set<string>>(new Set())

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(postText)
        resetValues();
    };

    const handleValueChange = useCallback((value: string) => {
        setUrls(getUrls(value))
        setPostText(value)
    }, [])

    const handleFocus = () => {
        setIsActive(true)
    }

    const resetValues = () => {
        setPostText("");
        setIsActive(false)
        setUrls(new Set())
    }

    return (
        <form onSubmit={handleSubmit} onFocus={handleFocus}>
            <TextEditor placeholder={placeholder} value={postText} onChange={handleValueChange}/>
            <Flex justifyContent="flex-end" overflow="hidden" height={isActive ? "auto": "0"}>
                <Button type="reset" variant="link" onClick={resetValues}>Avbryt</Button>
                <Button type="submit" ml={4} isDisabled={postText.trim().length < 1}>Publiser</Button>
            </Flex>
            <Box mx={-4}>
                <Embeds urls={urls}/>
            </Box>
        </form>
    )
}

export default StreamPostForm
