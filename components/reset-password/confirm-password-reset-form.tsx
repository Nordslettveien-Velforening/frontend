import { ErrorMessage } from "../util";
import React, { useState } from "react";
import { useInput } from "../../hooks/use-input";
import { useFirebase } from '../firebase/context';
import Router from 'next/router';


const ConfirmPasswordResetForm = ({code}) => {

    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
    const { value:passwordRepeat, bind:bindPasswordRepeat, reset:resetPasswordRepeat } = useInput("");
    const [error, setError] = useState("");
    const firebase = useFirebase();

    const isInvalid = password === '' || 
            passwordRepeat === '' ||
            password !== passwordRepeat;

    const handleSubmit = event => {
        event.preventDefault();
        firebase.confirmPasswordReset({code, password})
            .then(() => Router.push("/login"))
            .catch(setError)
        return false;
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Passord
                    <input {...bindPassword} type="password"/>
                </label>
                <label>
                    Gjenta passord
                    <input {...bindPasswordRepeat} type="password"/>
                </label>
                <button disabled={isInvalid} type="submit">Send</button>
            </form>
            {error !== "" && <ErrorMessage text={error}/>}
        </>
    )
}

export default ConfirmPasswordResetForm;
