import React from "react";
import Router from "next/router";
import { useAuth } from "./context";

const LogoutButton = () => {

    const auth = useAuth();

    const onLogout = () => {
        auth.logout().then(() => Router.push("/"));
    };

    return (<button onClick={onLogout}>Logg ut</button>)
};

export default LogoutButton
