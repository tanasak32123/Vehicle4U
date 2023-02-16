// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  username: string;
  password: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;
    if (!body.username || !body.password || !body.role) {
      return res.status(400).json({
        success: false,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      });
    }
    return res.status(200).json({ success: true });
  } else {
    res.redirect("/404");
  }
}
