import * as React from "react";
import { useState } from "react";
import Router from "next/router";
import { useInput } from "../../hooks/use-input";
import { withFirebase } from "../firebase";
import { ErrorMessage } from "../util";
import { useAuth } from "../authentication";

const SignUpForm = () => {

    const { value:givenName, bind:bindGivenName, reset:resetGivenName } = useInput("");
    const { value:surname, bind:bindSurname, reset:resetSurname } = useInput("");
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:mobile, bind:bindMobile, reset:resetMobile } = useInput("");
    const { value:houseNo, bind:bindHouseNo, reset:resetHouseNo } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
    const { value:passwordRepeat, bind:bindPasswordRepeat, reset:resetPasswordRepeat } = useInput("");
    const [error, setError] = useState("");
    const auth = useAuth();

    const isInvalid =
        password !== passwordRepeat ||
        password === '' ||
        passwordRepeat === '' ||
        email === '';

    const handleSubmit = event => {
        event.preventDefault();
        auth
            .createUser({email, givenName, surname, mobile, houseNo, password})
            .then(authUser => {
                Router.push("/minside")
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
                Fornavn
                <input {...bindGivenName} type="text"/>
            </label>
            <label>
                Etternavn
                <input {...bindSurname} type="text"/>
            </label>
            <label>
                E-post
                <input {...bindEmail} type="email"/>
            </label>
            <label>
                Mobil
                <input {...bindMobile} type="text"/>
            </label>
            <label>
                Husnummer
                <input {...bindHouseNo} type="houseNo"/>
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
            {error !== "" && <ErrorMessage text={error}/>}
        </form>
    );
};

export default SignUpForm;
