import { ChargerStatus, ChargeStatus } from './enum';

export type ChargeItem = {
  active: boolean;
  // 차번
  carNo?:string;
  // 차량 타입
  carType?:string;
  // 충전기 상태
  chargerStatus?: ChargerStatus;
  // 충전 상태
  chargeStatus?: ChargeStatus;
  // 멤버쉽 여부
  memberShip?:boolean;
  // 오바타임??
  overTime?:{
    rapidity:boolean;
  }
  time?: number;
};
