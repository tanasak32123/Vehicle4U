import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

export default function ProtectRoute({ children }: any) {
  const { isAuthenticate }: any = useAuth();

  const router = useRouter();
  const mustLoginRoutes = ["/profile"];
  const isLoginRoutes = ["/"];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (
      mustLoginRoutes.includes(router.pathname) &&
      !token &&
      !isAuthenticate
    ) {
      router.push("/");
    } else if (
      isLoginRoutes.includes(router.pathname) &&
      token &&
      isAuthenticate
    ) {
      router.push("/searchcar");
    }
  }, [isAuthenticate]);

  return children;
}
