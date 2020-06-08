import { withFirebase } from "../firebase";
import * as React from "react";
import { useState } from "react";
import Router from "next/router";
import { useInput } from "../../hooks/use-input";
import { ErrorMessage } from "../util";

const LoginForm = props => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
    const [error, setError] = useState(false);

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
                // TODO: Bruk feilkode og map til norsk tekst.
                setError(error.message)
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
            {error && <ErrorMessage text={error}/>}
        </form>
    )

};

export default withFirebase(LoginForm);
