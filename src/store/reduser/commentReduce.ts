import { CommentState, CommentActionTypes , CommentAction } from "../../types/commnet-types";

const INIT_STATE: CommentState = {
    comment:  [],
    error: null
}

export const  commentReducer = (state = INIT_STATE, action: CommentAction): CommentState => {
    switch(action.type) {
        case CommentActionTypes.FETCH_COMMENT:
            return {...state, comment: action.payload};
        case CommentActionTypes.FETCH_ERROR:
            return {...state, error: action.payload}
        default: return state
    }
}