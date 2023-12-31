// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    deleteCookie("token", {
      res,
      req,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    deleteCookie("role", {
      res,
      req,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    deleteCookie("currentRole", {
      res,
      req,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ message: "Logout successfully" });
  } else {
    res.status(404).redirect("/404");
  }
}
