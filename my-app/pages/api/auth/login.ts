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

    const expires = new Date(
      new Date(Date.now() + 5 * 60 * 60 * 1000).toUTCString()
    );

    setCookie("role", body.role, {
      req,
      res,
      secure: process.env.NODE_ENV !== "development",
      expires: expires,
      sameSite: "strict",
    });

    setCookie("token", data.token.access_token, {
      req,
      res,
      expires: expires,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    setCookie("currentRole", body.role, {
      req,
      res,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, role: body.role, message: "Login successfully!" });
  } else {
    return res.status(404).redirect("/404");
  }
};

export default handler;
