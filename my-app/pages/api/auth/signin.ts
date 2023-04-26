import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { signin } from "libs/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(404).redirect("/404");
  }

  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
    });
  }

  const data = await signin(username, password, role);

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "** ชื่อผู้ใช้ รหัสผ่าน หรือบทบาทของคุณไม่ถูกต้อง",
    });
  }

  const expires = new Date(
    new Date(Date.now() + 5 * 60 * 60 * 1000).toUTCString()
  );

  setCookie("role", role, {
    req,
    res,
    secure: process.env.NODE_ENV !== "development",
    expires: expires,
    sameSite: "strict",
    path: "/",
  });

  setCookie("token", data.token.access_token, {
    req,
    res,
    expires: expires,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  setCookie("currentRole", role, {
    req,
    res,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  return res
    .status(200)
    .json({ success: true, role, message: "Login successfully!" });
};

export default handler;
