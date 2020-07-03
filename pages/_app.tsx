import Firebase, { FirebaseContext } from "../components/firebase";
import * as React from "react";
import { Grommet } from 'grommet';
import { theme } from '../lib/theme';
import { AuthContextProvider } from "../components/authentication"

const MyApp = ({ Component, pageProps }) => (
    <FirebaseContext.Provider value={new Firebase()}>
        <AuthContextProvider>
            <Grommet theme={theme}>
                <Component {...pageProps}/>
            </Grommet>
        </AuthContextProvider>
    </FirebaseContext.Provider>
);

export default MyApp;
