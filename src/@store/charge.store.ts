import { create } from 'zustand';
import { ChargeItem } from '../@types/type';

interface IChargeProps {
  chargeList: ChargeItem[];
  setChargeItem: (index: number, item: ChargeItem) => void;
}

export const useChargeStore = create<IChargeProps>((set) => ({
  chargeList: [
    { active: false, time: 0,memberShip:false },
    { active: false, time: 0,memberShip:false },
    { active: false, time: 0,memberShip:false },
    { active: false, time: 0,memberShip:false },
  ],
  setChargeItem: (index, item) => {
    set((state) => ({
      chargeList: state.chargeList.map((charge, i) => (i === index ? item : charge)),
    }));
  },
}));
