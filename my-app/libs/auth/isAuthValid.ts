import { NextRequest } from "next/server";

const isAuthValid = (req: NextRequest): boolean => {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (!token || !role) return false;

  if (role !== "provider" && role !== "renter") return false;

  return true;
};

export default isAuthValid;
