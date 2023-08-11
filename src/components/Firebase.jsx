// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
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
    export const database = getDatabase(app);
    export const dbRef = ref(database);


    // useEffect(() => {
    //     if (saveState) {
    //         push(dbRef, itinerary);
    //     }
    // }, [saveState])