import { UserAction, UserState, UserActionTypes } from '../../types/user-types';

const INIT_STATE: UserState = {
   user: [],
   error: null,
   loading: false,
   edit: {},
   pagination: 1
}  

export const userReducer = (state = INIT_STATE, action: UserAction): UserState => {
    switch(action.type) {
        case UserActionTypes.FETCH_USERS:
            return {...state, loading: true}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {...state, loading: false, user: action.payload.data,
                    pagination: Math.ceil(action.payload.headers["x-total-count"] / 6)}
        case UserActionTypes.FETCH_USERS_ERROR:
            return {...state, loading: false, error: action.payload}
        case UserActionTypes.FETCH_USERS_UPDATE:
            return {...state, loading: false, edit: action.payload}
        default: return state 
    }
}