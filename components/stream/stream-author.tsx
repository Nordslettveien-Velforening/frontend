import React from "react";
import { User } from '../authentication/models';
import { Button } from "@chakra-ui/react";

const StreamAuthor = ({user}: {user: User}) => {

    return (
        <div>
            <Button variant="link">{user.givenName} {user.surname}</Button>
        </div>
    )
}

export default StreamAuthor
