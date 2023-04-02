import { NextRequest } from "next/server";

const isAuthValid = (req: NextRequest): boolean => {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const currentRole = req.cookies.get("currentRole")?.value;

  if (!token || (!role && !currentRole)) return false;

  if (role && role !== "provider" && role !== "renter") return false;

  if (currentRole && currentRole !== "provider" && currentRole !== "renter")
    return false;

  return true;
};

export default isAuthValid;
