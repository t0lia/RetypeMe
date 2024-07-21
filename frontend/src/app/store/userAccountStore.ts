import { Address } from "viem";
import { create } from "zustand";

interface IUserData {
  account: Address;
  isAuth: boolean;
  setAccount: (account: Address) => void;
  setIsAuth: (isAuth: boolean) => void;
  logout: () => void;
}

export const useUserAccountStore = create<IUserData>()((set) => ({
  account: "" as Address,
  isAuth: false,
  setAccount: (account: Address) => set((state) => ({ ...state, account })),
  setIsAuth: (isAuth: boolean) => set((state) => ({ ...state, isAuth })),
  logout: () =>
    set((state) => ({ ...state, account: "" as Address, isAuth: false })),
}));
