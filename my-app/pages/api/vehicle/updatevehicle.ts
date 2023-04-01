import type { NextApiRequest, NextApiResponse } from "next";
import validation from "@/libs/validation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(404).send("method not found");
  }

  const body = req.body;

  if (body.field == "name") {
    if (!validation.required(body.value)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่ชื่อรถของคุณ",
      });
    }
  }

  if (body.field == "registrationId") {
    if (!validation.required(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่เลขทะเบียนของรถ",
      });
    } else if (!validation.car_license_plate(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่เลขทะเบียนให้ถูกต้อง ตัวอย่างเช่น กข 1234",
      });
    }
  }

  if (body.field == "province") {
    if (!validation.required(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดเลือกจังหวัดของรถ",
      });
    } else if (!validation.thaiLangOnly(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดชื่อจังหวัดต้องเป็นภาษาไทยเท่านั้น",
      });
    }
  }

  if (body.field == "maximumCapacity") {
    if (!validation.required(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่จำนวนที่นั่งของรถ",
      });
    } else if (!validation.numberOnly(body.value as string)) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่จำนวนที่นั่งเป็นตัวเลขเท่านั้น",
      });
    } else if (Number(body.value) <= 0) {
      return res.status(400).json({
        success: false,
        field: body.field,
        message: "** โปรดใส่จำนวนที่นั่งที่มีค่ามากกว่า 0",
      });
    }
  }

  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  await fetch("http://localhost:3000/user/updatevehicle", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: body.id,
      [body.field]: body.value,
    }),
  }).then((response) => {
    if (response.ok) {
      return res.status(200).json({ success: true, field: body.field });
    }
    return res
      .status(response.status)
      .json({ success: false, error: response.statusText });
  });
};

export default handler;
