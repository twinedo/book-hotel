import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContactDetail {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface BankDetails {
  id: string;
  name: string;
  virtualAccount: string;
}

interface CheckoutState {
  currentStep: number;
  contactDetail: ContactDetail;
  paymentMethod: BankDetails;
  selectedHotel: {
    title: string;
    finalPrice: number;
    id: string;
  };
  notes: string;
}

interface CheckoutAction {
  setCurrentStep: (value: number) => void;
  setContactDetail: (value: ContactDetail) => void;
  setPaymentMethod: (value: BankDetails) => void;
  setSelectedHotel: (value: CheckoutState["selectedHotel"]) => void;
  setNotes: (value: string) => void;
  resetCheckout: () => void;
}

const initCheckoutState: CheckoutState = {
  currentStep: 1,
  contactDetail: {
    fullName: "",
    phoneNumber: "",
    email: "",
  },
  paymentMethod: {
    id: '',
    name: "",
    virtualAccount: "",
  },
  selectedHotel: {
    title: "",
    finalPrice: 0,
    id: "",
  },
  notes: ''
};

const useCheckoutStore = create<CheckoutState & CheckoutAction>()(
  persist(
    (set) => ({
      ...initCheckoutState,
      setCurrentStep: (value: number) => set({ currentStep: value }),
      setContactDetail: (value: ContactDetail) => set({ contactDetail: value }),
      setPaymentMethod: (value: BankDetails) => set({ paymentMethod: value }),
      setSelectedHotel: (value: CheckoutState["selectedHotel"]) =>
        set({ selectedHotel: value }),
      setNotes: (value: string) => set({notes: value}),
      resetCheckout: () => set(initCheckoutState),
    }),
    {
      name: "checkout-bookhotel-storage",
    }
  )
);

export default useCheckoutStore;
