import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, removeCookies, setCookie } from "cookies-next";
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
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const token = getCookie("token")?.toString();
    if (!user && token) {
      const role = JSON.parse(getCookie("user")!.toString()).role;
      try {
        await fetch("/api/fetchUser").then(async (response) => {
          if (!response.ok) {
            logout();
            setLoading(false);
          } else {
            const data = await response.json();
            setUser({ ...data.user, role });
            setLoading(false);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
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
          role,
        }),
      });
      setLoading(false);
      const data = await response.json();
      if (response.ok) {
        setUser({ ...data.user, role });
        sessionStorage.setItem("token", data.token.access_token);
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

  const updateUser = async (data: UserProfile) => {
    setLoading(true);
    const token = getCookie("token")?.toString();
    const userCookie = JSON.parse(getCookie("user")!.toString());
    const response = await fetch(
      `http://localhost:3000/user/editProfile/${userCookie.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    if (response.status != 200) {
      setLoading(false);
      return {
        success: false,
        statusCode: response.status,
        message: "** เกิดข้อผิดหลาดขึ้น โปรดลองใหม่อีกครั้ง",
      };
    } else {
      setLoading(false);
      return {
        success: true,
        statusCode: response.status,
        user: json,
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    removeCookies("token");
    removeCookies("user");
    router.push("/");
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
