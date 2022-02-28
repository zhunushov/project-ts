export interface UserState {
    user: any[],
    edit: any,
    loading: boolean,
    error: null | string;
    pagination: number
}

export enum UserActionTypes{
    FETCH_USERS = "FETCH_USERS",
    PAGE_USERS = "PAGE_USERS",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_UPDATE = "FETCH_USERS_UPDATE"
}

interface FetchUserAction  {
    type: UserActionTypes.FETCH_USERS
}
interface FetchUserActionSuccess  {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: any
}
interface FetchUserActionError{
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string
}
interface FetchUserActionEdit{
    type: UserActionTypes.FETCH_USERS_UPDATE;
    payload: {}
}
export type UserAction = FetchUserAction | FetchUserActionSuccess | FetchUserActionError | FetchUserActionEdit
