import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
}
