// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../../libs/auth/getUser";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { role } = req.query;

    const token = req.cookies.token;

    if (!token) res.status(401).send("Unauthorized");

    const user = await getUser(token!);

    if (!user) res.status(401).send("Unauthorized");

    setCookie(
      "user",
      { ...user, role },
      {
        req,
        res,
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV !== "development",
        sameSite: true,
      }
    );

    res.setHeader("Cache-Control", "public, max-age=5, immutable");
    res.status(200).json({ user });
  } else {
    res.redirect("/404");
  }
}
