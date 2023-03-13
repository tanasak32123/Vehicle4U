import { createContext, useContext, useState } from "react";
import useSWR from "swr";

//types
import AuthContextValue from "types/AuthContextValue";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const initValues: AuthContextValue = {
  auth: { status: "SIGNED_OUT", user: null },
  isLoading: true,
  authAction: {},
};

const AuthContext = createContext(initValues);

export const AuthProvider = (props: any) => {
  const { data, mutate, isLoading } = useSWR("/api/auth/getUser", fetcher);

  const logout = async () => {
    await fetch("/api/auth/logout");
    mutate({ status: "SIGNED_OUT", user: null });
    return {};
  };

  const value: AuthContextValue = {
    auth: data,
    isLoading,
    authAction: {
      logout,
      mutate,
    },
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
