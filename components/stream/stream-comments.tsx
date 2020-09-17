import React, { useState } from 'react';
import { StreamComment as StreamCommentModel } from "./models"
import { Box, Button, Grid } from "@chakra-ui/react";
import UserImage from "../ui/elements/user-image";
import StreamAuthor from "./stream-author";
import StreamDate from "./stream-date";
import StreamContent from "./stream-content";

type StreamCommentsProps = {
    comments: StreamCommentModel[]
}

const StreamComments = ({comments}: StreamCommentsProps) => {

    const [visibleComments, setVisibleComments] = useState(2);

    const viewAllComments = e => {
        e.preventDefault()
        setVisibleComments(Number.MAX_VALUE)
    }

    return (
        <div>
            {comments.length > 2 && visibleComments < Number.MAX_VALUE &&
                <Button
                    mt={2}
                    variant="link"
                    onClick={viewAllComments}
                >
                    Vis tidligere kommentarer
                </Button>
            }
            {comments.slice(visibleComments*-1).map((comment) =>
                <Grid key={comment.id} templateColumns={"auto 1fr"} gridGap={2} mt={4}>
                    <UserImage user={comment.postedBy} mt={2}/>
                    <Box px={4} py={2} borderRadius={12} bgColor="purple.100">
                        <StreamAuthor user={comment.postedBy}/>
                        <StreamDate postedDate={comment.posted}/>
                        <StreamContent markdown={comment.content}/>
                    </Box>
                </Grid>
            )}
        </div>

    )
}

export default StreamComments
