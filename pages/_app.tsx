import Firebase, { FirebaseContext } from "../components/firebase";
import * as React from "react";
import { AuthContextProvider } from "../components/authentication"
import "../styles/index.scss"
import App from "../components/App";

const MyApp = ({ Component, pageProps }) => (
    <FirebaseContext.Provider value={new Firebase()}>
        <AuthContextProvider>
            <App>
                <Component {...pageProps}/>
            </App>
        </AuthContextProvider>
    </FirebaseContext.Provider>
);

export default MyApp;
