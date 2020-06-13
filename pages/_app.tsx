import Firebase, { FirebaseContext } from "../components/firebase";
import * as React from "react";
import { AuthContextProvider } from "../components/authentication"

const MyApp = ({ Component, props }) => (
    <FirebaseContext.Provider value={new Firebase()}>
        <AuthContextProvider>
            <Component {...props}/>
        </AuthContextProvider>
    </FirebaseContext.Provider>
);

export default MyApp;
