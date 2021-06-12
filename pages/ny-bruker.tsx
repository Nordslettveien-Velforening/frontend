import React from "react";
import SignUpForm from "../components/signup/signup-form";
import Layout from "../components/ui/layout/layout";
import Card from "../components/ui/elements/card";
import { Heading } from "@chakra-ui/react";

const SignUpPage = () => (
    <Layout title="Registrer ny bruker">
        <Heading as="h1">Registrer ny bruker</Heading>
        <Card>
            <SignUpForm/>
        </Card>
    </Layout>
);

export default SignUpPage;
