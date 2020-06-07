import React from "react";
import { withFirebase } from "../firebase";
import Router from "next/router";

const LogoutButton = props => {

    const onLogout = () => {
        props.firebase.signOut().then(() => Router.push("/"));
    };

    return (<button onClick={onLogout}>Logg ut</button>)
};

export default withFirebase(LogoutButton);
