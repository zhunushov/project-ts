import { CommentAction, CommentActionTypes } from '../../types/commnet-types';
import { Dispatch } from 'redux';
import axios from 'axios';
import { API } from '../../Halpers/Halpers';


export const addCommnet = (id: any, newComment: any) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            await axios.post(`${API}/comment`, newComment, {})
        } catch (error) {
            dispatch({type: CommentActionTypes.FETCH_ERROR, payload: error + "error of Add Commet"})
        }
    }
}
export const getComment = () => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            const res = await axios.get(`${API}/comment`)
            dispatch({type: CommentActionTypes.FETCH_COMMENT, payload: res.data})
        } catch (error) {
           dispatch({type: CommentActionTypes.FETCH_ERROR, payload: error + "error of Get Comment"}) 
        }
    }
}