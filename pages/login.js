import React from "react";
import App from "../components/App";
import { useInput } from "../hooks/use-input";

const LoginPage = () => {

    const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${email} ${password}`);
        resetEmail();
        resetPassword();
    };

   return (
        <App>
            <form onSubmit={handleSubmit}>
                <label>
                    E-post
                    <input {...bindEmail} type="email"/>
                </label>
                <label>
                    Passord
                    <input {...bindPassword} type="password"/>
                </label>
                <button type="submit">Logg inn</button>
            </form>
        </App>
    );

};

export default LoginPage;

