import React from "react";
import App from "../components/App";
import LoginForm from "../components/login/login-form";
import Link from "next/link";
import { withAuthentication } from "../components/authentication";

const LoginPage = props => {

    return (
        <App>
            <h1>Logg inn</h1>
            <LoginForm/>
            <p>
                <Link href={"/signup"}><a>Registrer ny bruker</a></Link>
            </p>
        </App>
    );
};

export default withAuthentication(LoginPage);

