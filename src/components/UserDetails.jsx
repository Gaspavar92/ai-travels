import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import './styles/UserDetails.css'

const UserDetails = ({getUserInfo, username}) => {

    const [authUser, setAuthUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                    setAuthUser(user);
                    getUserInfo(user);
                
            } else {
                setAuthUser(null);
                getUserInfo(null);
            }
        })

        return () => {
            listen();
        }

    }, []);

    const userSignOut = () => {
        signOut(auth);
    }

    return (
        authUser ? 
        <div className='login-info'>
            <p>Hello, {username ? username : authUser.displayName}</p>
            <a onClick={userSignOut}>SIGN OUT</a>
        </div> :
        <div className='login-info'>
            <p>You are not logged in</p>
        </div> 
    )
};

export default UserDetails;