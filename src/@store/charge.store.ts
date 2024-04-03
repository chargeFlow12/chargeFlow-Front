import { create } from 'zustand';
import {ChargeItem} from "../@types/type";

interface IChargeProps {
  chargeList: ChargeItem[];
  setChargeItem: (index:number,item: ChargeItem) => void;
}

export const useChargeStore = create<IChargeProps>((set) => ({
  chargeList: [{active:false,time:0},{active:false,time:0},{active:false,time:0},{active:false,time:0}],
  setChargeItem: (index,item) => {
    set((state) =>{
      state.chargeList[index]=item
      return state})
},
}));
