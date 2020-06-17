import React, { useEffect } from "react";
import { useAuth, withAuthentication } from "./context";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const LoginToggle = () => {
    const auth = useAuth();
    return auth.isLoggedIn ? <LogoutButton/> : <LoginButton/>
};

export default LoginToggle
