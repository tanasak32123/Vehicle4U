// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

    try {
      // handle API call to sign in here.
      const data: Data = {
        username: body.username,
        password: body.password,
        role: body.role,
      };

      await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.status != 200) {
          return res.status(400).json({
            success: false,
            message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
          });
        } else {
          const user = await response.json();
          // setCookie("user", JSON.stringify(data), {
          //   req,
          //   res,
          //   path: "/",
          //   maxAge: 7200, // Expires after 2hr
          //   sameSite: true,
          // });
          return res.status(200).json({ success: true });
        }
      });
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
  } else {
    res.redirect("/404");
  }
}
