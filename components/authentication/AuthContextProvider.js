import React from 'react';
import AuthContext from "./context";
import { useAuthProvider } from "./auth-provider";

export function AuthContextProvider({ children }) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
