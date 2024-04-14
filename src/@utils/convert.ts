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

export const convertCongestion = (value:number) => {
  if(value<0.3){
    return '원활'
  }else if(value<0.7){
    return '다소 혼잡'
  }else if(value<1){
    return '혼잡'
  } else{
    return '원활'
  }
}