import React, { useEffect, useState } from 'react';
import { withFirebase } from '../firebase';
import Router from "next/router";
import { LoadingIndicator } from "../util";

const withAuthorization = condition => Component => {
    const WithAuthorization = props => {

        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            (async function () {
                props.firebase.auth.onAuthStateChanged(
                    authUser => {
                        if (condition(authUser)) {
                            setIsAuthorized(true);
                        } else {
                            Router.push("/login");
                        }
                    }
                );
            })()
        });

        return isAuthorized ? <Component {...props}/> : <LoadingIndicator/>
    };

    return withFirebase(WithAuthorization)
};

export default withAuthorization;
