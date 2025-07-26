import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      expiry: null,

      login: (userData) => {
        const expiryTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
        set({ user: userData, isAuthenticated: true, expiry: expiryTime });
      },

      logout: () => set({ user: null, isAuthenticated: false, expiry: null }),

      checkExpiry: () => {
        const state = useAuthStore.getState();
        if (state.expiry && Date.now() > state.expiry) {
          set({ user: null, isAuthenticated: false, expiry: null });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        user: state.user
          ? Object.fromEntries(
              Object.entries(state.user).filter(
                ([key]) => !["message"].includes(key)
              )
            )
          : null,
      }),
    }
  )
);
