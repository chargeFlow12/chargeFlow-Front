import { create } from 'zustand';

interface ILoadingProps {
  loading: boolean;
  setLoading: (loadiing: boolean) => void;
}

export const useLoadingStore = create<ILoadingProps>((set: any) => ({
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
}));
