import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Create an auth context
const AuthContext = React.createContext();

// This function will use the auth context in all the user action components
export const useAuth = () => useContext(AuthContext);

// Our auth provider takes in children that will be rendered
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // Below are user actions (e.g., signing up, logging in)
    // currentUser is set in useEffect

    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const logout = () => auth.signOut();
    const resetPassword = email => auth.sendPasswordResetEmail(email);
    const updateEmail = email => currentUser.updateEmail(email);
    const updatePassword = password => currentUser.updatePassword(password);

    useEffect(() => {
        // Firebase lets us know via onAuthStateChanged whether a user has been set
        // It will only run upon the first mount
        // Whenever createUserWithEmailAndPassword is called, onAuthStateChanged will be called too
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Passing in currentUser (which is a state) and all the user actions
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
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}