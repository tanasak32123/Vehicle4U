import { PropsWithChildren, createContext, useContext, useState } from "react";
import defaultOptions from "@/libs/apiDefault";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    console.log(json);
    console.log(response);
    setLoading(false);
    if (response.status != 200) {
      return {
        success: false,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      };
    } else {
      setCookie("user", json.user, {
        maxAge: 18000, // Expires after 5hr
      });
      setCookie("token", json.token.access_token, {
        maxAge: 18000, // Expires after 5hr
      });
      setCookie("role", role, {
        maxAge: 18000, // Expires after 5hr
      });
      return { success: true, json };
    }
  };

  const getUser = async () => {
    setLoading(true);
    const user = getCookie("user") as string;
    const token = getCookie("token") as string;
    console.log(token);
    const obj = JSON.parse(user);
    const response = await fetch(`http://localhost:3000/user/${obj.id}`, {
      ...defaultOptions,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setLoading(false);
    if (response.status == 200) {
      return { success: true, json };
    } else {
      return {
        success: false,
        message: "try again!",
      };
    }
  };

  const logout = () => {
    removeCookies("token");
    removeCookies("user");
    removeCookies("role");
    setUser(null);
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
