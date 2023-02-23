import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  deleteCookie,
  getCookie,
  removeCookies,
  setCookie,
} from "cookies-next";
import { useRouter } from "next/router";
import UserModel from "@/interfaces/UserModel";
import UserSignUp from "@/interfaces/UserSignUp";
import UserProfile from "@/interfaces/UserSignUp";
import AuthContextValue from "@/interfaces/AuthContextValue";

const authContextDefaultValues: AuthContextValue = {
  user: null,
  isAuthenticate: false,
  loading: true,
  authAction: {},
};

export const AuthContext = createContext<AuthContextValue>(
  authContextDefaultValues
);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const router = useRouter();

  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    const token = getCookie("token")?.toString();
    if (!user && token) {
      const role = JSON.parse(getCookie("user")!.toString()).role;
      try {
        const res = await fetch("/api/fetchUser");
        if (!res.ok) {
          logout();
        } else {
          const data = await res.json();
          setCookie(
            "user",
            { ...data.user, role },
            {
              maxAge: 18000, // Expires after 5hr
            }
          );
          setUser({ ...data.user, role });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const login = async (username: string, password: string, role: string) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: role == "provider",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ ...data.user, role });
        setCookie(
          "user",
          { ...data.user, role },
          {
            maxAge: 18000, // Expires after 5hr
          }
        );
        setCookie("token", data.token.access_token, {
          maxAge: 18000, // Expires after 5hr
        });
        router.push("/searchcar");
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (data: UserSignUp, role: string) => {
    try {
      const response = await fetch(`/api/signup/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (response.ok) {
        router.push("/signup/success", "/signup");
      }
      return body;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (
    data: UserProfile,
    type: string,
    values: string[]
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, type, values }),
      });
      const body = await response.json();
      setLoading(false);
      return body;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
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
      getUser,
      updateUser,
    },
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
