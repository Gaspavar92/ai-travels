// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const Firebase = () => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "ai-travel-cb3d8.firebaseapp.com",
    projectId: "ai-travel-cb3d8",
    storageBucket: "ai-travel-cb3d8.appspot.com",
    messagingSenderId: "792225441237",
    appId: "1:792225441237:web:8ed2acf787fdbda7a5895c"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app)

    return (null)
};

export default Firebase;