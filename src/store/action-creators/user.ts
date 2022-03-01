import { UserAction, UserActionTypes } from '../../types/user-types';
import { Dispatch } from "redux"
import axios from 'axios';
import { API, USER } from '../../Halpers/Halpers';

export const addUser = (newUser: any) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            await axios.post(`${API}/${USER}`, newUser)
            getUser()
        } catch (error: any) {
            dispatch({ type: UserActionTypes.FETCH_USERS_ERROR, payload: error})
        }
    }
}

export const getUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {            
            dispatch({type: UserActionTypes.FETCH_USERS})
            const res = await axios(`${API}/${USER}/${window.location.search}`)
            dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: res})
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload:error})
        }
    }
}

export const deleteUser = (id: any) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
             await axios.delete(`${API}/${USER}/${id}`)
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error})
        }
    }
}

export const editUser = (id: any) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
            const { data } = await axios(`${API}/${USER}/${id}`)
            dispatch({type: UserActionTypes.FETCH_USERS_UPDATE, payload: data})
        } catch (error: any) {
           dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error}) 
        }
    }
}

export const saveEditedUser = (id: any, editedUser: any) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            await axios.patch(`${API}/${USER}/${id}`, editedUser)
            getUser()
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error})
        }
    }
}