import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyB85RLWwD5FdAk0npfCamBHz9kdei_MNik',
    authDomain: "simple-firebase-project-setup.firebaseapp.com",
    projectId: "simple-firebase-project-setup",
    storageBucket: "simple-firebase-project-setup.firebasestorage.app",
    messagingSenderId: "694558500757",
    appId: '1:694558500757:web:b79223a4ba1e87b8a6389c',
    measurementId: "G-1FFD5TTLV8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };