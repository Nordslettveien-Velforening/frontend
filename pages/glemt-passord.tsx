import React from "react";
import ResetPasswordForm from "../components/reset-password/reset-password-form";
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";

const ResetPasswordPage = () => {

    return (
        <Layout title="Nytt passord">
            <h1>Sett nytt passord</h1>
            <Card>
                <p>Fyll ut e-postadressen din, så sender vi deg en e-post med instruksjoner om hvordan du kan sette nytt passord.</p>
                <ResetPasswordForm/>
            </Card>
        </Layout>
    );
};

export default ResetPasswordPage;

