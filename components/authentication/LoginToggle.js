import React from "react";
import { withAuthentication } from "./context";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const LoginToggle = props => {
    return props.isLoggedIn ? <LogoutButton/> : <LoginButton/>
};

export default withAuthentication(LoginToggle)
