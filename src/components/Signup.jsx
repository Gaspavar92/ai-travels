import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "./styles/SignUp.css"
// import { app } from "./Firebase";
   

const SignUp = ({show, handleSignIn}) => {

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

    if (!show) return null;

    return (
        <div className="sign-up">
            <h2>Sign Up</h2>
            <form action="#" onSubmit={signUp} className="sign-up-form">
                <label htmlFor="email">E-Mail</label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="email" required/>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="password" required/>
                <button type="submit" className="sign-up-button">Sign up</button>
            </form>
            <div className="already-signed">
            <p>Already have an account? </p><a onClick={handleSignIn}>Sign In</a>
            </div>
        </div>
    )
}

export default SignUp;