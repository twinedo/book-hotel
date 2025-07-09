import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "~repo-shared";
import { createPersistStorage } from "./storage";

export type UserStoreState = {
  user: User | undefined;
  isLoggedIn: boolean;
  token: string;
};

export type UserStoreActions = {
  setUser: (value: User | undefined) => void;
  setIsLoggedIn: (value: boolean) => void;
  setToken: (value: string) => void;
};

export const initialUserState: UserStoreState = {
  user: undefined,
  isLoggedIn: false,
  token: "",
};

export type UserStore = UserStoreState & UserStoreActions;

const storage = createPersistStorage<UserStoreState>();

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialUserState,
      setUser: (value: User | undefined) => set({ user: value }),
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      setToken: (value: string) => set({ token: value }),
    }),
    {
      name: "user-bookhotel-storage",
      storage
    }
  )
);

export default useUserStore;
