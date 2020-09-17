import * as React from "react";
import { User } from "../../authentication/models";
import Avatar from "boring-avatars";
import { chakra } from "@chakra-ui/react";

type UserImageProps = {
    variant?: "round" | "square"
    user: User
};

const UserImage = (props: UserImageProps) => {
    // TODO: Show real image if set.
    return <Avatar
            size={36}
            name={props.user.givenName+" "+props.user.surname}
            variant="beam"
            colors={["#6C5DD3", "#413880", "#F4F0FF", "#2D3748", "#B2C3FE"]}
            {...props}
        />
};

export default chakra(UserImage);
