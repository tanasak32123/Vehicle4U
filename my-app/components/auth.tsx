import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultOptions from "@/libs/apiDefault";
import { removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (sessionStorage.token) {
        const response = await fetch("user", { ...defaultOptions });
        const json = await response.json();
        const { data: user } = json.user;
        setUser(user);
        console.log("Got user", user);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (username: string, password: string, role: string) => {
    await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    }).then(async (response) => {
      const json = await response.json();
      if (json.token.access_token) {
        setCookie("user", JSON.stringify(json.user), {
          maxAge: 18000, // Expires after 5hr
        });
        setCookie("token", JSON.stringify(json.token), {
          maxAge: 18000, // Expires after 5hr
        });
      }
    });

    const logout = () => {
      removeCookies("token");
      setUser(null);
      router.push("/");
    };

    return (
      <AuthContext.Provider
        value={{ isAuthenticated: !!user, user, login, loading, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
}

export const useAuth = () => useContext(AuthContext);
