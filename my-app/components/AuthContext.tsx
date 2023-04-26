import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

//types
import AuthContextValue from "types/AuthContextValue";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const initValues: AuthContextValue = {
  auth: { status: "SIGNED_OUT", user: null, role: null },
  isLogout: false,
  isLoading: true,
  authAction: {},
};

const AuthContext = createContext(initValues);

export const AuthProvider = (props: any) => {
  const { data, isLoading, mutate } = useSWR("/api/auth/fetchuser", fetcher);
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout")
      .then(() => {
        router.push("/");
      })
      .then(() => {
        mutate();
      });
  };

  const value: AuthContextValue = {
    auth: data,
    isLogout,
    isLoading,
    authAction: {
      logout,
      mutate,
      setIsLogout,
    },
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
