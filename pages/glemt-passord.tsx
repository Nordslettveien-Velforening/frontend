import React from "react";
import ResetPassword from "../components/password/reset-password";
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";
import { Heading } from "@chakra-ui/react";

const ResetPasswordPage = () => {

    return (
        <Layout title="Nytt passord">
            <Heading as="h1">Sett nytt passord</Heading>
            <Card>
                <p>Fyll ut e-postadressen din, så sender vi deg instruksjoner om hvordan du kan sette nytt passord.</p>
                <ResetPassword/>
            </Card>
        </Layout>
    );
};

export default ResetPasswordPage;

