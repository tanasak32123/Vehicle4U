import { NextRequest } from "next/server";

const isAuthPath = ["/profile", "/vehicles/upload_car"];
const isRolePath = ["/vehicles/upload_car"];

const protectRoute = (req: NextRequest) => {
  const url = req.nextUrl;
};
