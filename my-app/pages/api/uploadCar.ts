import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.redirect("/404");
  }
  const body = req.body;
  const token = req.cookies.token;

  //   const car = await editCar(token, data);

  //   if (!car) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "** เกิดข้อผิดพลาดขึ้น โปรดลองใหม่อีกครั้ง",
  //     });
  //   }
  return res.status(200).json({ success: true });
}
