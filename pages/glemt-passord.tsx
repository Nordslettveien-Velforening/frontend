import React from "react";
import App from "../components/App";
import ResetPasswordForm from "../components/reset-password/reset-password-form";

const ResetPasswordPage = () => {

    return (
        <>
            <h1>Sett nytt passord</h1>
            <p>Fyll ut e-postadressen din, så sender vi deg en e-post med instruksjoner om hvordan du kan sette nytt passord.</p>
            <ResetPasswordForm/>
        </>
    );
};

export default ResetPasswordPage;

