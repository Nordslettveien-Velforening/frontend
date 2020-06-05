import * as React from "react";
import {useInput} from "../../hooks/use-input";
import {withFirebase} from "../firebase";

const SignUpForm = props => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
    const { value:passwordRepeat, bind:bindPasswordRepeat, reset:resetPasswordRepeat } = useInput("");

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
                console.log("Success", authUser)
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
            <label>
                Gjenta passord
                <input {...bindPasswordRepeat} type="password"/>
            </label>
            <button disabled={isInvalid} type="submit">Registrer</button>
        </form>
    );
};

export default withFirebase(SignUpForm);
