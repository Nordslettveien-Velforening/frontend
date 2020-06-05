import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCoCW5vyx_2U7BtsdOpnrbnyC84yWL91Eg",
    authDomain: "fir-test-e898d.firebaseapp.com",
    databaseURL: "https://fir-test-e898d.firebaseio.com",
    projectId: "fir-test-e898d",
    storageBucket: "fir-test-e898d.appspot.com",
    messagingSenderId: "709527243664",
    appId: "1:709527243664:web:2e044a3c2f2f23c9a70115"
};

class Firebase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.auth = firebase.auth();
    }

    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () =>
        this.auth.signOut();

    resetPassword = email =>
        this.auth.sendPasswordResetEmail(email);

    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
