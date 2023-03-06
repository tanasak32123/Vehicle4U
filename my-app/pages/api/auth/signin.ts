// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { userLogin } from "../../../libs/auth/userLogin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;
    if (!body.username || !body.password || !body.role) {
      res.status(400).json({
        success: false,
        message: "ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      });
    }

    const data = await userLogin(body.username, body.password, body.role);

    if (!data) {
      res.status(400).json({
        success: false,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      });
    }

    res
      .setHeader(`authorization`, `Bearer ${data.token.access_token}`)
      .status(200)
      .json({ success: true, ...data });
  } else {
    res.status(404).redirect("/404");
  }
}
