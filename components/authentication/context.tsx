import React, { useContext } from 'react';
import { AuthProvider} from "./models";

const AuthContext = React.createContext<AuthProvider>(null);

export const withAuthentication = Component => props => (
    <AuthContext.Consumer>
        {auth => <Component {...props} auth={auth} />}
    </AuthContext.Consumer>
);

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
