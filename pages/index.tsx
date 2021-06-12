import Layout from "../components/ui/layout/layout";
import Stream from '../components/stream/stream';
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";

const IndexPage = () => {
    return (
        <Layout contentWidth="60rem">
            <Grid templateColumns="34rem 1fr" gridGap={4}>
                <GridItem>
                    <Stream/>
                </GridItem>
                <GridItem>
                    <Heading as="h2" size="md">Nyheter fra styret</Heading>
                </GridItem>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
