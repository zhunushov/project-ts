import { useState, useEffect } from 'react';
import { AuthAction, AuthActionTypes } from './../../types/auth-types';
import { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Auth/Firebase';

export const SignUp =  (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            createUserWithEmailAndPassword(auth, email, password) 
        } catch (error) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: error + "error of Sign Up"})
        }
    }
} 

export const SignIn =  (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: error + "error of Sign In"})
        }
    }
} 

export const Logout = () => {
    return signOut(auth)
}

const provider = new GoogleAuthProvider()
export const googleAuth = () => {
    return async (dispatch: Dispatch <AuthAction>) => {
        try {
            signInWithPopup(auth, provider)
        } catch (err) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: err + "error of google Auth"})
        }
    }
}

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<any>()
    useEffect(() => {
        const onsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return onsub
    }, [])
    return currentUser 
}
