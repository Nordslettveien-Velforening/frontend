import React from "react";
import { isLoggedIn, useAuth, withAuthorization } from "../components/authentication";
import { Heading } from "@chakra-ui/react";
import Layout from "../components/ui/layout/layout";

const MyPage = () => {

    const { user } = useAuth();
    return (
        <Layout title="Min side">
            <Heading as="h1" size="2xl">Min side</Heading>
            <Heading as="h2" size="xl">Hei { user && `${user.givenName} ${user.surname}` }</Heading>
        </Layout>
    );
};

export default withAuthorization(isLoggedIn)(MyPage);

