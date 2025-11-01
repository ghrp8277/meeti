"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AccountRegisterState {
  accountHolder: string;
  bankId: string;
  accountNumber: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  setAccountHolder: (value: string) => void;
  setBankId: (value: string) => void;
  setAccountNumber: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setIsPhoneVerified: (value: boolean) => void;
  reset: () => void;
}

const AccountRegisterContext = createContext<AccountRegisterState | undefined>(
  undefined
);

export function AccountRegisterProvider({ children }: { children: ReactNode }) {
  const [accountHolder, setAccountHolder] = useState("");
  const [bankId, setBankId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const reset = () => {
    setAccountHolder("");
    setBankId("");
    setAccountNumber("");
    setPhoneNumber("");
    setIsPhoneVerified(false);
  };

  return (
    <AccountRegisterContext.Provider
      value={{
        accountHolder,
        bankId,
        accountNumber,
        phoneNumber,
        isPhoneVerified,
        setAccountHolder,
        setBankId,
        setAccountNumber,
        setPhoneNumber,
        setIsPhoneVerified,
        reset,
      }}
    >
      {children}
    </AccountRegisterContext.Provider>
  );
}

export function useAccountRegister() {
  const context = useContext(AccountRegisterContext);
  if (context === undefined) {
    throw new Error(
      "useAccountRegister must be used within AccountRegisterProvider"
    );
  }
  return context;
}
