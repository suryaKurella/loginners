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

    const signup = async (email, password, userName) => {
        await auth.createUserWithEmailAndPassword(email, password)
        return auth.currentUser.updateProfile({
            displayName: userName
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
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
        signup,
        logout
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
