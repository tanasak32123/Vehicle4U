import { createContext, useContext, useEffect, useState } from "react";
import defaultOptions from "@/libs/apiDefault";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import UserData from "@/interfaces/UserData";

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const login = async (username: string, password: string, role: string) => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    const json = await response.json();
    setLoading(false);
    if (response.status != 200) {
      return {
        success: false,
        statusCode: response.status,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      };
    } else {
      setCookie(
        "user",
        { ...json.user, role },
        {
          maxAge: 18000, // Expires after 5hr
        }
      );
      setCookie("token", json.token.access_token, {
        maxAge: 18000, // Expires after 5hr
      });
      setUser({ ...json.user, role });
      return { success: true, statusCode: response.status };
    }
  };

  const getUser = async () => {
    setLoading(true);
    const token = getCookie("token")?.toString();
    if (!user && token) {
      const userCookie = JSON.parse(getCookie("user")!.toString());
      const response = await fetch(
        `http://localhost:3000/user/${userCookie.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setLoading(false);
      if (response.status == 200) {
        setUser({ ...json, ...userCookie.role });
        return { success: true, statusCode: response.status };
      }
      return { success: false, statusCode: response.status };
    }
    setLoading(false);
  };

  const logout = () => {
    removeCookies("token");
    removeCookies("user");
    router.push("/");
  };

  const auth = {
    user,
    isAuthenticate: !!user,
    loading,
    authAction: {
      login,
      logout,
      getUser,
    },
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
