import React, { useEffect, useState } from 'react';
import LoadingIndicator from "../util/loading-indicator"
import { useAuth } from "./context";
import { useRouter } from "next/router";

const withAuthorization = condition => Component => {
    return props => {
        const { user, isLoading } = useAuth();
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (condition(user) && !isLoading) {
                setIsAuthorized(true);
            } else {
                if (!isLoading) {
                    setIsAuthorized(false)
                    router.push("/login")
                }
            }
        }, [user, isLoading]);

        return !isLoading && isAuthorized ? <Component {...props}/> : <LoadingIndicator/>
    }
};

export default withAuthorization;
