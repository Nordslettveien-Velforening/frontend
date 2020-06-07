import React from "react";
import App from "../components/App";
import { isLoggedIn, withAuthorization } from "../components/authentication";

const MyPage = () => {

    return (
        <App>
            <h1>Min side</h1>
        </App>
    );
};

export default withAuthorization(isLoggedIn)(MyPage);

