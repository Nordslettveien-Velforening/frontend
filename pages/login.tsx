import React from "react";
import App from "../components/App";
import LoginForm from "../components/login/login-form";
import Link from "next/link";

const LoginPage = () => {

    return (
        <App>
            <h1>Logg inn</h1>
            <LoginForm/>
            <p>
                <Link href={"/ny-bruker"}><a>Registrer ny bruker</a></Link>
                <Link href={"/glemt-passord"}><a>Glemt passord</a></Link>
            </p>
        </App>
    );
};

export default LoginPage;

