import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import UserModel from "@/interfaces/UserModel";
import UserSignUp from "@/interfaces/UserSignUp";
import UserProfile from "@/interfaces/UserSignUp";
import AuthContextValue from "@/interfaces/AuthContextValue";

const initValues: AuthContextValue = {
  user: null,
  isAuthenticate: false,
  loading: true,
  authAction: {},
};

const AuthContext = createContext(initValues);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const router = useRouter();

  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  const fetchUser = async () => {
    if (!hasCookie("user")) {
      setLoading(false);
      return;
    }
    const role = JSON.parse(getCookie("user") as string).role;
    const res = await fetch(`/api/auth/fetchUser/${role}`);
    setLoading(false);
    if (!res.ok) {
      logout();
      return;
    }
    const user = JSON.parse(getCookie("user")?.toString()!);
    setUser({ ...user });
  };

  const login = async (username: string, password: string, role: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return data;
    setUser({ ...data.user });
    router.push("/searchcar");
  };

  const signUp = async (data: UserSignUp, role: string) => {
    const response = await fetch(`/api/auth/signup/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    setLoading(false);
    return body;
  };

  const updateUser = async (
    data: UserProfile,
    type: string,
    values: string[]
  ) => {
    setLoading(true);
    const response = await fetch(`/api/auth/updateProfile/${user?.role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, type, values }),
    });
    const body = await response.json();
    setLoading(false);
    return body;
  };

  const logout = async () => {
    await fetch("/api/auth/logout");
    setLoading(false);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticate: !!user,
    loading,
    authAction: {
      setUser,
      setLoading,
      login,
      signUp,
      logout,
      fetchUser,
      updateUser,
    },
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
