import {ChargerStatus, ChargeStatus} from "../@types/enum";

export const convertCharge=(value?:ChargerStatus)=>{
    switch (value){
        case ChargerStatus.CHARGING:
            return '충전중'
        case ChargerStatus.NONE_ELECTRIC:
            return '전기차 아님'
        case ChargerStatus.NONE:
            return '해당없음'
        default: return '해당없음'
    }
}
export const convertCharger=(value?:ChargeStatus)=>{
    switch (value){
        case ChargeStatus.RAPIDITY:
            return '충전중'
        case ChargeStatus.NONE:
            return '해당없음'
        default: return '해당없음'
    }
}
