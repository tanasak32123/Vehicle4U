import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { login } from "@/libs/auth/login";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const body = req.body;
    if (!body.username || !body.password || !body.role) {
      return res.status(400).json({
        success: false,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      });
    }

    const data = await login(body.username, body.password, body.role);

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
      });
    }

    setCookie("role", body.role, {
      req,
      res,
      secure: process.env.NODE_ENV !== "development",
      sameSite: true,
    });

    setCookie("token", data.token.access_token, {
      req,
      res,
      maxAge: 60 * 60 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully!" });
  } else {
    return res.status(404).redirect("/404");
  }
};

export default handler;
