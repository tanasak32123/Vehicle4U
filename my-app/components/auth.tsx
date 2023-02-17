import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import UserModel from "@/interfaces/UserModel";
import UserSignUp from "@/interfaces/UserSignUp";
import UserProfile from "@/interfaces/UserSignUp";

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const router = useRouter();

  const [user, setUser] = useState<UserModel | null>(null);
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

  const signUp = async (data: UserSignUp, role: string) => {
    const response = await fetch(`http://localhost:3000/auth/signup/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status != 200) {
      if (body.message == "username exist") {
        return {
          success: false,
          statusCode: response.status,
          error: "username",
          message: "** ชื่อผู้ใช้นี้ถูกใช้แล้ว",
        };
      } else {
        return {
          success: false,
          statusCode: response.status,
          error: "citizen_id",
          message: "** หมายเลขบัตรประชนนี้ถูกใช้แล้ว",
        };
      }
    } else {
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
        setUser({ ...json, role: userCookie.role });
        return { success: true, statusCode: response.status };
      }
      return { success: false, statusCode: response.status };
    }
    setLoading(false);
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
    removeCookies("token");
    removeCookies("user");
    router.push("/");
  };

  const auth = {
    user,
    isAuthenticate: !!user,
    loading,
    authAction: {
      setUser,
      login,
      signUp,
      logout,
      getUser,
      updateUser,
    },
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
