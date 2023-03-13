import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";
import { getCookie } from "cookies-next";

export default function ProtectRoute({ children }: any) {
  const { isAuthenticate }: any = useAuth();

  const router = useRouter();
  const mustLoginRoutes = ["/profile"];
  const isLoginRoutes = ["/"];

  useEffect(() => {
    const token = getCookie("token")?.toString();
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
