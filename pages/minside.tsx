import React from "react";
import App from "../components/App";
import { isLoggedIn, useAuth, withAuthorization } from "../components/authentication";

const MyPage = () => {

    const user = useAuth().user;
    return (
        <App>
            <h1>Min side</h1>
            <h2>Hei {user?.givenName} {user?.surname}</h2>
        </App>
    );
};

export default withAuthorization(isLoggedIn)(MyPage);

