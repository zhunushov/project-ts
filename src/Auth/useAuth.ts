import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../types/auth-types';
import { auth } from './Firebase';


export const useAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const [currentUser, setCurrentUser ] = useState<any>()
            useEffect(() => {
                const unsub = onAuthStateChanged(auth, user => {
                    setCurrentUser(user)
                })
                return unsub
            },[])
            return currentUser
        } catch (error) {
            dispatch({type: AuthActionTypes.AUTH_ERROR, payload: error + "error of useAuth"}) 
        }
    }
}