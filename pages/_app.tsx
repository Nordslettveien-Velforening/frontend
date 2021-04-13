import * as React from "react";
import type { AppProps } from "next/app";
import Firebase, { FirebaseContext } from "../components/firebase";
import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/heebo";
import "@fontsource/poppins";
import theme from "../lib/theme";
import { AuthContextProvider } from "../components/authentication"
import { getMainMenuItems } from "../integrations/sanityClient";
import { AppContextProvider } from "../components/context/app-context";
import App from "next/app";
import { setLocale } from "yup";

setLocale({
    mixed: {
        required: "Feltet må fylles ut"
    },
    string: {
        email: "E-post må være en gyldig e-postadresse"
    }
})

const MyApp = ({ Component, pageProps }: AppProps) => (
        <FirebaseContext.Provider value={new Firebase()}>
            <ChakraProvider theme={theme}>
                <AuthContextProvider>
                    <AppContextProvider mainMenuItems={pageProps.mainMenuItems}>
                        <Component {...pageProps}/>
                    </AppContextProvider>
                </AuthContextProvider>
            </ChakraProvider>
        </FirebaseContext.Provider>
    )

export default MyApp;

MyApp.getInitialProps = async (appContext) => {
    const mainMenuItems = await getMainMenuItems();
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps,
        pageProps: {
            ...appProps.pageProps,
            mainMenuItems
        }
    }
}
