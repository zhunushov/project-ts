import { IElec } from "./IElec";

export interface ElecState  {
    elec: any;
    elecLength: number;
    error: null | string 
}

export enum ElecActionTypes {
    GET_ELEC = "GET_ELEC",
    GET_ELEC_LENGHT = "GET_ELEC_LENGHT",
    GET_ELEC_ERROR = "GET_ELEC_ERROR",
}

interface ElecActionSuccess {
     type: ElecActionTypes.GET_ELEC;
     payload: IElec
}

interface ElecActionError {
     type: ElecActionTypes.GET_ELEC_ERROR;
     payload: string
}

interface ElecActionLenght {
     type: ElecActionTypes.GET_ELEC_LENGHT;
     payload: number
}

export type ElecAction = ElecActionLenght | ElecActionError | ElecActionSuccess;