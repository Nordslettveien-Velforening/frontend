import React, { ReactNode } from 'react';
import AuthContext from "./context";
import { useAuthProvider } from "./auth-provider";

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
