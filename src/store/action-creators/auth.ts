import { useState, useEffect } from 'react';
import { AuthAction, AuthActionTypes } from './../../types/auth-types';
import { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Auth/Firebase';

export const SignUp =  (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password) 
            dispatch({type: AuthActionTypes.AUTH_SUCCES, payload: user})            
        } catch (error) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: error + "error of Sign Up"})
        }
    }
} 

export const SignIn =  (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            dispatch({type: AuthActionTypes.AUTH_SUCCES, payload: user})
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
            const user = await signInWithPopup(auth, provider)
            dispatch({type: AuthActionTypes.AUTH_SUCCES, payload: user})
        } catch (err) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: err + "error of google Auth"})
        }
    }
}


// export const useAuth = () => {
//     return async (dispatch: Dispatch<AuthAction>) => {
//         try {
//             const [currentUser, setCurrentUser] = useState<any>(auth)
//                 useEffect(() => {
//                     const ons = onAuthStateChanged(auth, user => {
//                         setCurrentUser(user)
//                     })
//                     return ons
//                 }, []) 
//                 dispatch({type: AuthActionTypes.AUTH_SUCCES, payload: currentUser})
//         } catch (error) {
//             dispatch({type: AuthActionTypes.AUTH_ERROR, payload: error + "error of useAuth"}) 
//         }
//     }
// }