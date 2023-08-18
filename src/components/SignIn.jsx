import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import "./styles/SignIn.css"
// import { app } from "./Firebase";
   

const SignIn = ({show, handleSignUp}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [show]);

    // Initializing authentication with Firebase
    
    const signIn = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
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
        <div className="sign-in">
            <h2>Sign In</h2>
            <form action="#" onSubmit={signIn} className="sign-in-form">
                <label htmlFor="email">E-Mail</label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="email" required/>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="password" required/>
                <button type="submit" className="sign-in-button">Sign In</button>
            </form>
            <div className="not-yet-signed">
                <p>Not signed up yet?</p><a onClick={handleSignUp}>Create account</a>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default SignIn;