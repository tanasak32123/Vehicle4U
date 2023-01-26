// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const body = req.body;
    if (!body.username || !body.password) {
      return res
        .status(400)
        .json({ message: "** username หรือ password ของคุณไม่ถูกต้อง" });
    }

    // res.status(200).json({
    //   message: `username and password is validated.`,
    // });
  } else {
    res.redirect("/404");
  }
}
