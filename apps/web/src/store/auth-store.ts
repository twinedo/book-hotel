import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistStorage } from "./storage";

export type AuthStoreState = { currentTab: "login" | "register" };

export type AuthStoreActions = {
  setCurrentTab: (value: "login" | "register") => void;
};

export type AuthStore = AuthStoreState & AuthStoreActions;

const storage = createPersistStorage<AuthStoreState>();

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentTab: "login",
      setCurrentTab: (value: "login" | "register") =>
        set({ currentTab: value }),
    }),
    {
      name: "auth-bookhotel-storage",
      storage
    }
  )
);

export default useAuthStore;
