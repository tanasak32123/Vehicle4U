import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultOptions from "@/libs/apiDefault";

const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: PropsWithChildren) {
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
}

export const useAuth = () => useContext(AuthContext);
