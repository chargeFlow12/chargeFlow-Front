import { ChargerStatus, ChargeStatus } from '../@types/enum';

export const convertCharge = (value?: ChargerStatus) => {
  switch (value) {
    case ChargerStatus.CHARGING:
      return '충전중';
    case ChargerStatus.NONE_ELECTRIC:
      return '전기차 아님';
    case ChargerStatus.NONE:
      return '충전가능';
    default:
      return '충전가능';
  }
};
export const convertCharger = (value?: ChargeStatus) => {
  switch (value) {
    case ChargeStatus.RAPIDITY:
      return '완속';
    case ChargeStatus.NONE:
      return '충전방해';
    default:
      return '비어있음';
  }
};
