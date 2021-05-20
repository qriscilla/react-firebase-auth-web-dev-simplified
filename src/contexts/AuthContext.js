import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Create an auth context
const AuthContext = React.createContext();

// This function will use the auth context in Signup.js
export const useAuth = () => useContext(AuthContext);

// Our auth provider takes in children that will be rendered
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // This will create user with the entered email and password
    // We're not setting the currentUser yet, though. See useEffect
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = email => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = email => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = password => {
        return currentUser.updatePassword(password);
    }

    // onAuthStateChanged will only run upon mounting
    useEffect(() => {
        // Firebase lets us know via onAuthStateChanged whether a user has been set
        // Whenever createUserWithEmailAndPassword is called, onAuthStateChanged will be called too
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    // See above. currentUser is a state
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        // Use the auth context
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}