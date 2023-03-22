import { createContext, useContext } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

//types
import AuthContextValue from "types/AuthContextValue";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const initValues: AuthContextValue = {
  auth: { status: "SIGNED_OUT", user: null, role: null },
  isLoading: true,
  authAction: {},
};

const AuthContext = createContext(initValues);

export const AuthProvider = (props: any) => {
  const { data, mutate, isLoading } = useSWR("/api/auth/getUser", fetcher);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout").then(() => {
      mutate();
      router.push("/");
    });
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
