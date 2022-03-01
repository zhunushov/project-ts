import { IAuth } from "./IAuth";

export interface AuthState {
    auth: IAuth;
    error: string
}

export  enum AuthActionTypes  {
    AUTH_SUCCES = "AUTH_SUCCES",
    AUTH_ERROR = "AUTH_ERROR"
}

interface AuthActionSuccess {
    type: AuthActionTypes.AUTH_SUCCES;
    payload: IAuth
}

interface AuthActionError {
    type: AuthActionTypes.AUTH_ERROR;
    payload: string
}
export type AuthAction = AuthActionError | AuthActionSuccess