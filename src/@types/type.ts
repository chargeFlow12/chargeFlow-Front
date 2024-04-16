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
  overTime?:number;
  time?: number;
};

export type CommonChargeItem={
  // 충전기 id
  chgerId:string;
  // 충전기 상태
  // (1: 통신이상, 2: 충전대기,
  // 3: 충전중, 4: 운영중지,
  // 5: 점검중, 9: 상태미확인)
  stat:1|2|3|4|5|9
  // 충전기타입
  // (01:DC차데모,
  // 02: AC완속,
  // 03: DC차데모+AC3상,
  // 04: DC콤보,
  // 05: DC차데모+DC콤보
  // 06: DC차데모+AC3상+DC콤보,
  // 07: AC3상
  // 08: DC콤보(완속))
  chgerType:'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'
  // 상태 갱신일시
  statUpdDt:string;
  // 마지막 충전시작일시
  lastTsdt:string;
  // 마지막 충전종료일시
  lastTedt:string;
  // 충전중 시작일시
  nowTsdt:string;
}