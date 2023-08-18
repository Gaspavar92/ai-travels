import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import "./styles/Signup.css"
   
const SignUp = ({show, handleSignIn, onSignUp}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    // Initializing authentication with Firebase
    
    const signUp = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, {displayName: username}).then(() => {
                onSignUp(user.displayName);
            })
            // ...
            }).catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            // ..
            }).finally(() => {
                setEmail('');
                setPassword('');
                setUsername('');
            });
    }

    if (!show) return null;

    return (
        error ?
        <p className="error">{error}</p> :
        <div className="sign-up">
            <h2>Sign Up</h2>
            <form action="#" onSubmit={signUp} className="sign-up-form">
                <label htmlFor="name">Name</label>
                <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} className="name" required/>
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