import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)
        })
    }, [])


    const value = {
        currentUser,
        login,
        signup
    }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}

            </AuthContext.Provider>
        </div>
    );
};

export default AuthContext;
