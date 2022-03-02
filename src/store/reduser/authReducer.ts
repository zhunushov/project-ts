import { AuthState, AuthAction, AuthActionTypes } from './../../types/auth-types';
const INIT_STATE: AuthState = {
    error: null,
}

export const authReducer = (state = INIT_STATE, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_ERROR: 
            return {...state, error: action.payload}
        default: return state
    }
}