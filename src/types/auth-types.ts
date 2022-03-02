
export interface AuthState {
    error: null | string
}

export  enum AuthActionTypes  {
    AUTH_ERROR = "AUTH_ERROR"
}

interface AuthActionError {
    type: AuthActionTypes.AUTH_ERROR;
    payload: string
}
export type AuthAction = AuthActionError 