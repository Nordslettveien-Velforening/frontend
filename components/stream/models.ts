import { User } from '../authentication/models';

export type postId = string
export type commentId = string

type StreamContent = {    
    content: string,
    posted: Date
    postedBy: User
}

export type StreamPost = StreamContent & {
    id: postId,
    comments: StreamComment[]
}

export type StreamComment = StreamContent & {
    id: commentId,
    replyTo: postId
}
