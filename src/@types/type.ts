import { ChargerStatus, ChargeStatus } from './enum';

export type ChargeItem = {
  active: boolean;
  carNo?:string;
  carType?:string;
  chargerStatus?: ChargerStatus;
  chargeStatus?: ChargeStatus;
  memberShip?:boolean;
  overTime?:{
    rapidity:boolean;
  }
  time?: number;
};
