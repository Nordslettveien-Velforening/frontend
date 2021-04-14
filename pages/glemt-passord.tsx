import React from "react";
import ResetPassword from "../components/password/reset-password";
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";

const ResetPasswordPage = () => {

    return (
        <Layout title="Nytt passord">
            <h1>Sett nytt passord</h1>
            <Card>
                <p>Fyll ut e-postadressen din, så sender vi deg instruksjoner om hvordan du kan sette nytt passord.</p>
                <ResetPassword/>
            </Card>
        </Layout>
    );
};

export default ResetPasswordPage;

