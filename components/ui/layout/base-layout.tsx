import * as React from "react";
import { ReactNode } from "react";
import Head from "next/head";
import { Box, Grid } from "@chakra-ui/react";
import Header from "./header";

type BaseLayoutProps = {
    title?: string;
    children: ReactNode
};

const BaseLayout = ({title, children}: BaseLayoutProps) => {

    const applyTitle = (title) => {
        title = title ? `${title} - ` : "";
        return title + "Nordslettveien Velforening";
    }

    return (
        <>
            <Head>
                <title>{applyTitle(title)}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Grid
                gridTemplateRows="5rem 1fr"
                height="100vh"
            >
                <Header/>
                <Box bg="beige.200">
                    {children}
                </Box>
            </Grid>
        </>
    );
};

export default BaseLayout;
