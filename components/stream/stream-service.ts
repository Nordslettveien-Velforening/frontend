import { StreamComment, StreamPost, postId } from './models';
import firebase, { firestore } from "firebase";

export const getPosts = (
    callback: (posts: StreamPost[]) => void,
    onError: (message: string) => void
) => {
    return firebase.firestore().collection("stream")
        .orderBy("posted", "desc")
        .onSnapshot(snap => {
            const p = []
            snap.forEach(doc => p.push(withDate(doc.data())))
            callback(p)
        }, error => onError(error.message))
}

export const createPost = (post: StreamPost) => {
    console.log("Creating stream post", post)
    return firebase.firestore().collection("stream").doc(post.id).set(post)
}


export const createComment = (comment: StreamComment) => {
    return firebase.firestore().collection("stream").doc(comment.replyTo).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
    })
}


function withDate(firebaseObject: any) {
    if (!firebaseObject) return null;

    for (const [key, value] of Object.entries(firebaseObject)) {

        // covert items inside array
        if (value && Array.isArray(value) )
            firebaseObject[key] = value.map(item => withDate(item));

        // convert inner objects
        if (value && typeof value === 'object' ){
            firebaseObject[key] = withDate(value);
        }

        // convert simple properties
        if (value && value.hasOwnProperty('seconds'))
            firebaseObject[key] = (value as firestore.Timestamp).toDate();
    }
    return firebaseObject;
}
