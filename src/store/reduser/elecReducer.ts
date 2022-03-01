import { ElecState, ElecAction, ElecActionTypes } from './../../types/elec-types';
const INIT_STATE: ElecState = {
    elec: {} ,
    error: null,
    elecLength: 0
}

export const elecReducer = (state = INIT_STATE, action: ElecAction): ElecState => {
    switch(action.type) {
        case ElecActionTypes.GET_ELEC:
            return {...state, elec: action.payload}
        case ElecActionTypes.GET_ELEC_ERROR:
            return {...state, error: action.payload}
        case ElecActionTypes.GET_ELEC_LENGHT:
            return {...state, elecLength: action.payload}
        default: return state
    }
}