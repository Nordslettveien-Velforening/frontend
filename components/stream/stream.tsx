import React from "react";
import StreamPostForm from "./stream-post-form"
import StreamPosts from "./stream-posts";
import Card from "../ui/elements/card";
import { createPost } from "./stream-service";
import { v4 as uuid } from "uuid";
import Router from "next/router";
import { useAuth } from "../authentication";
import { Grid, Heading, useToast } from "@chakra-ui/react";
import SignupBanner from "../signup/signup-banner";
import UserImage from "../ui/elements/user-image";

const Stream = () => {
    const {user, isLoggedIn, isLoading} = useAuth();
    const toast = useToast()

    const onNewPost = (value: string) => {
        if (user) {
            createPost({
                id: uuid(),
                content: value,
                posted: new Date(),
                postedBy: user,
                comments: []
            }).catch(e => {
                console.log(e)
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
            <Heading as="h2" size="md">Strømmen</Heading>
            {!isLoading &&
            <Card p={4}>
                {isLoggedIn &&
                <Grid templateColumns="auto 1fr" gridGap={2}>
                    {user && <UserImage user={user}/>}
                    <StreamPostForm placeholder="Skriv et innlegg..." onSubmit={onNewPost}/>
                </Grid>
                }
                {!isLoggedIn &&
                <SignupBanner/>
                }
            </Card>
            }
            <StreamPosts/>
        </>
    )
}

export default Stream
