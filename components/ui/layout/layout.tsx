import * as React from "react";
import { ReactNode, useContext } from "react";
import { Box, Center, Grid } from "@chakra-ui/react";
import MainMenu from "../main-menu";
import LoadingIndicator from "../../util/loading-indicator";
import BaseLayout from "./base-layout";
import { AppContext } from "../../context/app-context";

type LayoutProps = {
    title?: string
    contentWidth?: string,
    loading?: boolean
    children: ReactNode,
};

const Layout = ({title, contentWidth = "34rem", loading = false, children}: LayoutProps) => {

    const { mainMenuItems } = useContext(AppContext);

    return (
        <BaseLayout title={title}>
            <Grid
                padding="2rem"
                gridTemplateColumns="auto 1fr"
                gridGap="2rem"
            >
                <div>
                    <MainMenu menuItems={mainMenuItems}/>
                </div>
                <Box as="main" width={contentWidth}>
                    {loading
                        ? (
                            <Center position="relative" top="calc(50% - 1.5rem)">
                                <LoadingIndicator size="xl"/>
                            </Center>
                        )
                        : children
                    }
                </Box>
            </Grid>
        </BaseLayout>
    );
};

export default Layout;
