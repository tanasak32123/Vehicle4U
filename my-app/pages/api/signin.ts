// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
    try {
      await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
          role: body.role == "provider" ? 1 : 0,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          res.status(400).json({
            success: false,
            message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
          });
        } else {
          const user = await response.json();
          res.status(200).json({ success: true, ...user });
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(404).redirect("/404");
  }
}
