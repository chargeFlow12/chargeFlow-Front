import { create } from 'zustand';

interface ISelectIndex {
  selectIndex?: number;
  setSelectIndex: (selectIndex?: number) => void;
}

export const useSelectIndexStore = create<ISelectIndex>((set: any) => ({
    setSelectIndex: (selectIndex) => set(() => ({ selectIndex })),
}));
