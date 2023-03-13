import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.redirect("/404");
  }
  const body = req.body;
  const type = body.type;
  const values = body.values;
  //   const data: EditCar = {};

  if (type == "name") {
    const car_name = values[0];
    if (!car_name) {
      return res
        .status(400)
        .json({ message: "**กรุณากรอกชื่อรถยนต์ให้เรียบร้อย" });
    }
  }

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
