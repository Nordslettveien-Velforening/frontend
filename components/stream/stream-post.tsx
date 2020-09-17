import React from "react";
import StreamComments from './stream-comments';
import Card from "../ui/elements/card";
import { Box, Flex, useToast } from "@chakra-ui/react";
import IfLoggedIn from "../util/if-logged-in";
import StreamPostForm from "./stream-post-form";
import { createComment } from "./stream-service";
import { v4 as uuid } from "uuid";
import Router from "next/router";
import { useAuth } from "../authentication";
import UserImage from "../ui/elements/user-image";
import StreamAuthor from "./stream-author";
import StreamDate from "./stream-date";
import Embeds from "./embed/embeds";
import getUrls from "get-urls";
import StreamContent from "./stream-content";

const StreamPost = ({post}) => {
    const auth = useAuth();
    const toast = useToast()

    const onNewComment = (value: string) => {
        if (auth.user) {
            createComment({
                replyTo: post.id,
                id: uuid(),
                content: value,
                posted: new Date(),
                postedBy: auth.user
            }).catch(() => {
                toast({
                    title: "Ooops!",
                    description: "Det oppsto en feil ved lagring av innlegget. Prøv igjen siden.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
        } else {
            Router.push("/login")
        }
        return false;
    };


    return (
        <Card mt={4} p={4}>
            <Flex alignItems="center">
                <UserImage user={post.postedBy} mr={2}/>
                <Box>
                    <StreamAuthor user={post.postedBy}/>
                    <StreamDate postedDate={post.posted}/>
                </Box>
            </Flex>
            <Box mt={4}>
                <StreamContent markdown={post.content}/>
            </Box>
            <Box mx={-4}>
                <Embeds urls={getUrls(post.content)}/>
            </Box>
            <StreamComments comments={post.comments}/>
            <IfLoggedIn>
                <Box mt={4}>
                    <StreamPostForm placeholder="Skriv en kommentar..." onSubmit={onNewComment}/>
                </Box>
            </IfLoggedIn>
        </Card>
    )
}

export default StreamPost
