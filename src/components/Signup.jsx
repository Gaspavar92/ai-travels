import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "./styles/SignUp.css"
// import { app } from "./Firebase";
   

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Initializing authentication with Firebase
    
    const signUp = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            })
            .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            // ..
            }).finally(() => {
                setEmail('');
                setPassword('');
            });
    }

    return (
        <div className="sign-up">
        <form action="#" onSubmit={signUp}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
            <button type="submit">Sign up</button>
        </form>
        <p>Already signed up? </p><button className="already-signed-up">Sign In</button>
        </div>
    )
}

export default SignUp;