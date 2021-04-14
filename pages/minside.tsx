import React from "react";
import { isLoggedIn, useAuth, withAuthorization } from "../components/authentication";
import { Box, chakra, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Layout from "../components/ui/layout/layout";
import Error from "next/error";
import PageHeading from "../components/ui/elements/page-heading";
import Card from "../components/ui/elements/card";
import ChangePassword from "../components/password/change-password";

const MyPage = () => {

    const { user } = useAuth();
    if (!user) {
        return <Error statusCode={500}/>
    }

    return (
        <Layout title="Min side" contentWidth="50rem">
            <PageHeading>Min side</PageHeading>
            <Text as="p">Vi har følgende informasjon registrert om deg:</Text>
            <Box pl={6} color="gray.700" borderLeftWidth="2px" borderLeftColor="purple.500">
                {user.givenName} {user.surname}<br/>
                Nordslettveien {user.houseNo}<br/>
                E-post: {user.email}<br/>
                Mobil: {user.mobile}
            </Box>
            <Tabs
                mt={8}
                variant="soft-rounded"
                colorScheme="purple"
            >
                <TabList>
                    <PillTab>Innstillinger</PillTab>
                    <PillTab>Endre kontaktinfo</PillTab>
                    <PillTab>Profilbilde</PillTab>
                    <PillTab>Bytt passord</PillTab>
                </TabList>
                <TabPanels mt={4}>
                    <StyledTabPanel>
                        <Card>Innstillinger</Card>
                    </StyledTabPanel>
                    <StyledTabPanel>
                        <Card>Endre kontaktinfo</Card>
                    </StyledTabPanel>
                    <StyledTabPanel>
                        <Card>Profilbilde</Card>
                    </StyledTabPanel>
                    <StyledTabPanel>
                        <Card><ChangePassword/></Card>
                    </StyledTabPanel>
                </TabPanels>
            </Tabs>
        </Layout>
    );
};

const PillTab = chakra(Tab, {
    baseStyle: {
        color: "purple.500",
        bg: "white",
        marginRight: 3,
        _selected: {
            bg: "purple.500",
            color: "white"
        },
    }
})

const StyledTabPanel = chakra(TabPanel, {
    baseStyle: {
        padding: 0
    }
})

export default withAuthorization(isLoggedIn)(MyPage);

