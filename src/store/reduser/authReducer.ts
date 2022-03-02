import { AuthState, AuthAction, AuthActionTypes } from './../../types/auth-types';
const INIT_STATE: AuthState = {
    error: null,
    auth: {},
}

export const authReducer = (state = INIT_STATE, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_SUCCES: 
            return {...state, auth: action.payload}
        case AuthActionTypes.AUTH_ERROR: 
            return {...state, error: action.payload}
        default: return state
    }
}