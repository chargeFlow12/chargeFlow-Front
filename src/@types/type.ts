import {ChargerStatus, ChargeStatus} from "./enum";


export type ChargeItem={
    active:boolean;
    chargerStatus?:ChargerStatus;
    chargeStatus?:ChargeStatus;
    time?:number;
}