import {ChargerStatus, ChargeStatus} from '../@types/enum';
import {CommonChargeItem} from "../@types/type";

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
export const convertOverTime=(chargeStatus:ChargeStatus,time:number)=>{
  switch (chargeStatus) {
    case ChargeStatus.RAPIDITY:
      return `급속 ${time}시간`;
    case ChargeStatus.SLOW_CHARGE:
      return `완속 ${time}시간`;
    case ChargeStatus.NONE:
      return '충전방해';
    default:
      return '비어있음';
  }
}

export const convertCharger = (value?: ChargeStatus) => {
  switch (value) {
    case ChargeStatus.RAPIDITY:
      return '급속';
    case ChargeStatus.SLOW_CHARGE:
      return '완속';
    case ChargeStatus.RAPIDITY_AND_SLOW:
      return '급속/완속';
    case ChargeStatus.NONE:
      return '충전방해';
    default:
      return '비어있음';
  }
};

export const convertCongestion = (value:number) => {
  if(value<=0.3){
    return '원활'
  }else if(value<=0.7){
    return '다소 혼잡'
  }else if(value<=1){
    return '혼잡'
  } else{
    return '원활'
  }
}

export const convertTemp = (value:CommonChargeItem['chgerType'],electric:boolean)=>{
  if(electric){
    switch (value){
      case '01':
        return ChargeStatus.RAPIDITY;
      case '02':
        return ChargeStatus.SLOW_CHARGE;
      case '03':
        return ChargeStatus.SLOW_CHARGE;
      case '04':
        return ChargeStatus.SLOW_CHARGE;
      case '05':
        return ChargeStatus.RAPIDITY;
      case '06':
        return ChargeStatus.RAPIDITY_AND_SLOW;
      case '07':
        return ChargeStatus.SLOW_CHARGE;
      case '08':
        return ChargeStatus.RAPIDITY_AND_SLOW;
    }
  }else{
    return ChargeStatus.NONE
  }

}