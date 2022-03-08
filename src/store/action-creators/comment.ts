import { CommentAction, CommentActionTypes } from '../../types/commnet-types';
import { API, COMMENT } from '../../Halpers/Halpers';
import { Dispatch } from 'redux';
import axios from 'axios';

export const addCommnet = (id: number, user: any) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
             await axios.post(`${API}/${COMMENT}`,{productId: id, user})
        } catch (error) {
            console.log(error);
            dispatch({type: CommentActionTypes.FETCH_ERROR, payload: error + "error of Add Comment"})
        }
    }
}

export const getComment = () => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            const res = await axios.get(`${API}/${COMMENT}`)
            dispatch({type: CommentActionTypes.FETCH_COMMENT, payload: res.data})
        } catch (error) {
            dispatch({type: CommentActionTypes.FETCH_ERROR, payload: error + "error of Get Comment"}) 
        }
    }
}

export const deleteComment  = (id: number) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
           await axios.delete(`${API}/${COMMENT}/${id}`)
        } catch (error) {
            dispatch({type: CommentActionTypes.FETCH_ERROR, payload: error + "Delete Comment"})
        }
    }
}
