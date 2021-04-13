import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import { AuthProvider, LoginCredentials, User, UserSignup } from "./models";

export const useAuthProvider = (): AuthProvider => {

    const  firebase = useFirebase();
    const [user, setUser] = useState<User | void>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const createUser = (userSignup: UserSignup): Promise<User> => {
        return firebase
            .createUserWithEmailAndPassword(userSignup)
            .then(user => {
                setUser(user);
                return user;
            });
    };

    const login = ({email, password}: LoginCredentials): Promise<User | void> => {
        setIsLoading(true);
        return firebase.signInWithEmailAndPassword(email, password).then(authUser => firebase.getUser(authUser.user.uid))
    };

    const logout = () => {
        setIsLoading(true);
        return firebase.signOut();
    };

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    firebase.getUser(authUser.uid).then(user => {
                        setUser(user);
                        setIsLoggedIn(true);
                        setIsLoading(false)
                    })
                } else {
                    setIsLoggedIn(false);
                    setUser(undefined);
                    setIsLoading(false)
                }
            }
        );
        return () => unsubscribe();
    }, []);

    return {
        user,
        createUser,
        login,
        logout,
        isLoggedIn,
        isLoading
    }
};
