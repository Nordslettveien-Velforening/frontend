import React, { useState } from "react";
import { useInput } from "../../hooks/use-input";
import { withFirebase } from "../firebase";
import LoginButton from "../authentication/LoginButton";
import { ErrorMessage, SuccessMessage } from "../util";

const ResetPasswordForm = props => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const isInvalid = email === '';

    const handleSubmit = event => {
        event.preventDefault();
        props.firebase
            .resetPassword(email)
            .then(authUser => {
                setSuccess("E-post sendt")
            })
            .catch(error => {
                // TODO: Bruk feilkode og map til norsk tekst.
                setError(error.message)
            });
        return false;
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    E-post
                    <input {...bindEmail} type="email"/>
                </label>
                <button disabled={isInvalid} type="submit">Send</button>
            </form>
            {success && <SuccessMessage text={success}><LoginButton/></SuccessMessage>}
            {error && <ErrorMessage text={error}/>}
        </>
    );
};

export default withFirebase(ResetPasswordForm);
