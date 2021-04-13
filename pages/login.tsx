import React from "react";
import LoginForm from "../components/login/login-form";
import BaseLayout from "../components/ui/layout/base-layout";
import { Box, Heading } from "@chakra-ui/react";
import Card from "../components/ui/elements/card";

const LoginPage = () => {

    return (
        <BaseLayout title="Logg inn">
            <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
                <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }} pt={6} px={6}>
                    <Heading as="h1">Logg inn</Heading>
                </Box>
                <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
                    <Card>
                        <LoginForm/>
                    </Card>
                </Box>
            </Box>
        </BaseLayout>
    );
};

export default LoginPage;

