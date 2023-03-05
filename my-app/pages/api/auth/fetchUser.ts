// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../libs/auth/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUser(token!);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res
      .setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate")
      .status(200)
      .json({ user });
  } else {
    res.redirect("/404");
  }
}
