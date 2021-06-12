import React, { useEffect, useState } from 'react';
import StreamPost from './stream-post';
import { getPosts } from './stream-service';
import { StreamPost as StreamPostModel } from "./models";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import GhostText from "../ui/elements/ghost-text";

const StreamPosts = () => {

    const toast = useToast()
    const [posts, setPosts] = useState<StreamPostModel[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        return getPosts(posts => {
            setPosts(posts);
            setIsLoading(false);
        }, handleError)
    }, [])

    function handleError(message: string) {
        toast({
            title: "Ooops!",
            description: "Det oppsto en feil ved henting av innlegg. Vennligst prøv igjen siden.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <>
            { posts.map((post) =>
                <StreamPost key={post.id} post={post} />
            )}
            { isLoading && <Flex justify="center" py={4}><Spinner size="xl" thickness="3px"/></Flex> }
            { !isLoading && posts.length === 0 &&
                <GhostText text="Det er ingen innlegg i Strømmen enda"/>
            }
        </>
    )
}


export default StreamPosts
