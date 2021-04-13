import React, { useEffect, useState } from 'react';
import LoadingIndicator from "../util/loading-indicator"
import { useAuth } from "./context";
import Router from "next/router";

const withAuthorization = condition => Component => {
    return props => {
        const auth = useAuth();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (condition(auth.user) && !auth.isLoading) {
                setIsAuthorized(true);
            } else {
                if (!auth.isLoading) {
                    Router.push("/login")
                }
            }
        }, [auth.user, auth.isLoading]);
        return !auth.isLoading && isAuthorized ? <Component {...props}/> : <LoadingIndicator/>
    }
};

export default withAuthorization;
