import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User, UserSignup } from "../authentication/models";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export class Firebase {
    auth: firebase.auth.Auth;
    private db: firebase.firestore.Firestore;

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            // firebase.firestore().enablePersistence()
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    createUserWithEmailAndPassword = async (signup: UserSignup): Promise<User> => {
        const user = await this.auth.createUserWithEmailAndPassword(signup.email, signup.password)
            .then(authUser => {
                return  {
                    uid: authUser.user.uid,
                    email: signup.email,
                    givenName: signup.givenName,
                    surname: signup.surname,
                    mobile: signup.mobile,
                    houseNo: signup.houseNo
                }
            });
        await this.db.collection("users").doc(user.uid).set(user);
        return user;
    };


    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () =>
        this.auth.signOut();

    resetPassword = email =>
        this.auth.sendPasswordResetEmail(email);

    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);

    getUser = (uid: string): Promise<User | void> => this.db.collection("users").doc(uid).get().then(doc => {
        return doc.exists ? doc.data() as User : undefined;
    });

}
