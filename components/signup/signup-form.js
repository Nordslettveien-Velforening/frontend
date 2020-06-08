import * as React from "react";
import { useState } from "react";
import Router from "next/router";
import { useInput } from "../../hooks/use-input";
import { withFirebase } from "../firebase";
import { ErrorMessage } from "../util";

const SignUpForm = props => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
    const { value:passwordRepeat, bind:bindPasswordRepeat, reset:resetPasswordRepeat } = useInput("");
    const [error, setError] = useState(false);

    const isInvalid =
        password !== passwordRepeat ||
        password === '' ||
        passwordRepeat === '' ||
        email === '';

    const handleSubmit = event => {
        event.preventDefault();
        props.firebase
            .createUserWithEmailAndPassword(email, password)
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
            <label>
                Gjenta passord
                <input {...bindPasswordRepeat} type="password"/>
            </label>
            <button disabled={isInvalid} type="submit">Registrer</button>
            {error && <ErrorMessage text={error}/>}
        </form>
    );
};

export default withFirebase(SignUpForm);
