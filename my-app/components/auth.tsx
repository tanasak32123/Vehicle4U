import { useRouter } from "next/router";

export default function Auth({ children }: any) {
  const router = useRouter();

  return <>{children}</>;
}
