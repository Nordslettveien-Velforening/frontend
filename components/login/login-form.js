import { withFirebase } from "../firebase";
import * as React from "react";
import Router from "next/router";
import { useInput } from "../../hooks/use-input";

const LoginForm = props => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");

    const isInvalid =
        password === '' ||
        email === '';

    const handleSubmit = event => {
        event.preventDefault();
        props.firebase
            .signInWithEmailAndPassword(email, password)
            .then(authUser => {
                Router.push("/mypage")
            })
            .catch(error => {
                console.error("Error", error)
            });
        return false;
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                E-post
                <input {...bindEmail} type="email"/>
            </label>
            <label>
                Passord
                <input {...bindPassword} type="password"/>
            </label>
            <button disabled={isInvalid} type="submit">Logg inn</button>
        </form>
    )

};

export default withFirebase(LoginForm);
