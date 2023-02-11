// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

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

    // try {
    //handle API call to sign in here.
    // await fetch("/").then(async (response) => {
    //   const data = await response.json();
    //   setCookie("user", JSON.stringify(data), {
    //     path: "/",
    //     maxAge: 7200, // Expires after 1hr
    //     sameSite: true,
    //   });
    //   return res.status(200).json({ success: true });
    // });
    //   return res.status(200).json({ success: true });
    // } catch (err) {
    //   return res.status(400).json({ success: false, err });
    // }
    return res.status(200).json({ success: true });
  } else {
    res.redirect("/404");
  }
}
