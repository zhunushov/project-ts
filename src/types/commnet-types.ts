import { IComment } from './IComment';
export interface CommentState {
    comment: any[];
    error: null | string;
}

export enum CommentActionTypes {
    FETCH_COMMENT = "FETCH_COMMENT",
    FETCH_ERROR = "FETCH_ERROR"
}

interface CommnetActionSuccess {
    type: CommentActionTypes.FETCH_COMMENT;
    payload: any[]
}
interface CommnetActionError {
    type: CommentActionTypes.FETCH_ERROR;
    payload: string
}
export type CommentAction = CommnetActionSuccess | CommnetActionError