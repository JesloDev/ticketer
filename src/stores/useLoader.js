import { create } from "zustand";

export const useLoader = create((set) => ({
  loader: false,

  setLoading: (state) => set({ loader: state }),
}));
