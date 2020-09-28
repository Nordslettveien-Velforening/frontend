import React from "react";
import App from "../components/App";
import { isLoggedIn, useAuth, withAuthorization } from "../components/authentication";

const MyPage = () => {

    const user = useAuth().user;
    return (
        <>
            <h1>Min side</h1>
            <h2>Hei {user?.givenName} {user?.surname}</h2>
        </>
    );
};

export default withAuthorization(isLoggedIn)(MyPage);

