// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const body = req.body;
    if (!body.username || !body.password) {
      return res
        .status(400)
        .json({ message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง" });
    }

    return res.status(200).json({ success: true });
  } else {
    res.redirect("/404");
  }
}
