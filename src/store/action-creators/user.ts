import { IUser } from './../../types/IUser';
import { UserAction, UserActionTypes } from './../../types/types';
import { Dispatch } from "redux"
import axios from 'axios';
import { API } from '../../Halpers/Halpers';

export const addUser = (newUser: IUser) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            await axios.post(API, newUser)
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
            const res = await axios(`${API}/${window.location.search}`)
            dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: res})
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload:error})
        }
    }
}
export const deleteUser = (id: any) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
            await axios.delete(`${API}/${id}`)
            getUser()
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error})
        }
    }
}
export const editUser = (id: any) => {
    return async (dispatch: Dispatch <UserAction>) => {
        try {
            const { data } = await axios(`${API}/${id}`)
            dispatch({type: UserActionTypes.FETCH_USERS_UPDATE, payload: data})
        } catch (error: any) {
           dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error}) 
        }
    }
}
export const saveEditedUser = (id: any, editedUser: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            await axios.patch(`${API}/${id}`, editedUser)
            getUser()
        } catch (error: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: error})
        }
    }
}