import React, { useContext } from 'react';
import { Firebase } from "./Firebase";

export const FirebaseContext = React.createContext<Firebase>(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export const useFirebase = (): Firebase => {
    return useContext(FirebaseContext);
};
