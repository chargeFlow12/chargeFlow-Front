import { create } from 'zustand';
import { ChargeItem } from '../@types/type';

interface IChargeProps {
  chargeList: ChargeItem[];
  setChargeList: (list: ChargeItem[] | undefined) => void;
  setChargeItem: (index: number, item: ChargeItem) => void;
}

export const useChargeStore = create<IChargeProps>((set) => ({
  chargeList: [
    { active: false, time: 0, memberShip: false },
    { active: false, time: 0, memberShip: false },
    { active: false, time: 0, memberShip: false },
    { active: false, time: 0, memberShip: false },
  ],
  setChargeList: (chargeList) => {
    set(() => ({ chargeList }));
  },
  setChargeItem: (index, item) => {
    set((state) => ({
      chargeList: state.chargeList.map((charge, i) => (i === index ? item : charge)),
    }));
  },
}));
