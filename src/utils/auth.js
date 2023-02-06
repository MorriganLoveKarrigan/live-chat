import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCEzMPgSAR9SInv-f--8z82BAnOEGGgdgI",
    authDomain: "chat-react-b63a1.firebaseapp.com",
    projectId: "chat-react-b63a1",
    storageBucket: "chat-react-b63a1.appspot.com",
    messagingSenderId: "748978187942",
    appId: "1:748978187942:web:bd37844c4e71afd0da8e67"
});

export const auth = getAuth(app)
export const firestore = getFirestore(app)