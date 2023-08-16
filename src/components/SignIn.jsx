import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "./styles/SignIn.css"
// import { app } from "./Firebase";
   

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Initializing authentication with Firebase
    
    const signIn = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
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
        <form action="#" onSubmit={signIn}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
            <button type="submit">Sign In</button>
        </form>
        <p>Not signed up yet? </p><button className="already-signed-up">Sign Up</button>
        </div>
    )
}

export default SignIn;