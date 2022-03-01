import { IElec } from './../../types/IElec';
import { ElecAction,  ElecActionTypes} from './../../types/elec-types';
import { Dispatch } from 'redux';
import { IUser } from './../../types/IUser';

export const addElected = (value: IUser) => {
    return (dispatch: Dispatch<ElecAction>) => {
        try {
           let elec = JSON.parse(`${localStorage.getItem("elec")}`)
            
           if(!elec) {
               elec = {
                   elected: []
               }
           }

            const newElec = {
                item: value
            }
            
            const filteredElec = elec.elected.filter((elem: any) => elem.item.id === value.id)
            if(filteredElec.length > 0) {
                elec.elected = elec.elected.filter((elem: any) => elem.item.id !== value.id)
            }else {
               elec.elected.push(newElec)
            }
            localStorage.setItem("elec", JSON.stringify(elec))
            dispatch({type: ElecActionTypes.GET_ELEC, payload: elec})
            dispatch({type: ElecActionTypes.GET_ELEC_LENGHT, payload: elec.elected.length})
        } catch (error: any) {
            dispatch({type: ElecActionTypes.GET_ELEC_ERROR, payload: error})
        }
    }
} 
 
export const getElected = () => {
    return (dispatch: Dispatch<ElecAction>) => { 
        try {
            let elec = JSON.parse(`${localStorage.getItem("elec")}`)
            if(!elec) {
                elec = {
                    elected: []
                }
            }
            dispatch({type: ElecActionTypes.GET_ELEC, payload: elec})
            dispatch({type: ElecActionTypes.GET_ELEC_LENGHT, payload: elec.elected.length})
        } catch (error: any) {
            dispatch({type: ElecActionTypes.GET_ELEC_ERROR, payload: error})
        }
    }
}

export const getElectedLength = () => {
    return (dispatch: Dispatch<ElecAction>) => {
        try{
            let elec = JSON.parse(`${localStorage.getItem("elec")}`)
            if(!elec) {
                elec = {
                    elected: []
                }
            }
            dispatch({type: ElecActionTypes.GET_ELEC_LENGHT, payload: elec.elected.length})
        }catch(e: any) {
            dispatch({type: ElecActionTypes.GET_ELEC_ERROR, payload: e})
        }
    }
}

export const deleteElec = (value: any) => {
    console.log(value)
    return (dispatch: Dispatch<ElecAction>) => {
        try {
            let elec = JSON.parse(`${localStorage.getItem('elec')}`)
             
            if(!elec) {
                elec = {
                    elected: []
                }
            }

            elec.elected = elec.elected.filter((elem: any) =>  elem.item.id !== value.id)
            localStorage.setItem("elec", JSON.stringify(elec))
           dispatch({type: ElecActionTypes.GET_ELEC, payload: elec})
        } catch (e: any) {
           dispatch({type: ElecActionTypes.GET_ELEC_ERROR, payload: e}) 
        }
    }
}