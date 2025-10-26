import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TosState {
  agreedItems: number[];
  addAgreedItem: (id: number) => void;
  removeAgreedItem: (id: number) => void;
  setAgreedItems: (items: number[]) => void;
  clearAgreedItems: () => void;
  isAllAgreed: (totalCount: number) => boolean;
}

interface MobileState {
  phoneNumber: string;
  authCode: string;
  isVerified: boolean;
  showVerificationInput: boolean;
  isTimerExpired: boolean;
  setPhoneNumber: (phoneNumber: string) => void;
  setAuthCode: (authCode: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  setShowVerificationInput: (show: boolean) => void;
  setIsTimerExpired: (expired: boolean) => void;
  resetMobileState: () => void;
}

interface SignupState extends TosState, MobileState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetAllState: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    (set, get) => ({
      // TOS State
      agreedItems: [],

      addAgreedItem: (id: number) => {
        set((state) => {
          const items = Array.isArray(state.agreedItems)
            ? state.agreedItems
            : [];
          return {
            agreedItems: items.includes(id) ? items : [...items, id],
          };
        });
      },

      removeAgreedItem: (id: number) => {
        set((state) => {
          const items = Array.isArray(state.agreedItems)
            ? state.agreedItems
            : [];
          return {
            agreedItems: items.filter((item) => item !== id),
          };
        });
      },

      setAgreedItems: (items: number[]) => {
        set({ agreedItems: Array.isArray(items) ? items : [] });
      },

      clearAgreedItems: () => {
        set({ agreedItems: [] });
      },

      isAllAgreed: (totalCount: number) => {
        const items = Array.isArray(get().agreedItems) ? get().agreedItems : [];
        return items.length === totalCount;
      },

      // Mobile State
      phoneNumber: "",
      authCode: "",
      isVerified: false,
      showVerificationInput: false,
      isTimerExpired: false,

      setPhoneNumber: (phoneNumber: string) => {
        set({ phoneNumber });
      },

      setAuthCode: (authCode: string) => {
        set({ authCode });
      },

      setIsVerified: (isVerified: boolean) => {
        set({ isVerified });
      },

      setShowVerificationInput: (showVerificationInput: boolean) => {
        set({ showVerificationInput });
      },

      setIsTimerExpired: (isTimerExpired: boolean) => {
        set({ isTimerExpired });
      },

      resetMobileState: () => {
        set({
          phoneNumber: "",
          authCode: "",
          isVerified: false,
          showVerificationInput: false,
          isTimerExpired: false,
        });
      },

      // Step State
      currentStep: 0,

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      // Combined Reset
      resetAllState: () => {
        set({
          agreedItems: [],
          phoneNumber: "",
          authCode: "",
          isVerified: false,
          showVerificationInput: false,
          isTimerExpired: false,
          currentStep: 0,
        });
      },
    }),
    {
      name: "signup-storage",
      partialize: (state) => ({
        agreedItems: state.agreedItems,
        phoneNumber: state.phoneNumber,
        authCode: state.authCode,
        isVerified: state.isVerified,
        showVerificationInput: state.showVerificationInput,
        isTimerExpired: state.isTimerExpired,
        currentStep: state.currentStep,
      }),
    }
  )
);
