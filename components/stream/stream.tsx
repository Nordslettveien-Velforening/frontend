import React, { useState } from "react";
import StreamPostForm from "./stream-post-form"
import IfLoggedIn from "../util/if-logged-in"
import StreamPosts from "./stream-posts";
import Card from "../ui/elements/card";
import { createPost } from "./stream-service";
import { v4 as uuid } from "uuid";
import Router from "next/router";
import { useAuth } from "../authentication";
import { useToast } from "@chakra-ui/react";

const Stream = () => {
    const auth = useAuth();
    const toast = useToast()

    const onNewPost = (value: string) => {
        if (auth.user) {
            createPost({
                id: uuid(),
                content: value,
                posted: new Date(),
                postedBy: auth.user,
                comments: []
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
    }

    return (
        <>
            <IfLoggedIn>
                <Card p={4}>
                    <StreamPostForm placeholder="Skriv et innlegg..." onSubmit={onNewPost}/>
                </Card>
            </IfLoggedIn>
            <StreamPosts/>
        </>
    )
}

export default Stream
