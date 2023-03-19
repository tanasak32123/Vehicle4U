import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import CatInformation from "@/types/CarInformation";

const editCarInformation = async (token: string | undefined, data: object) => {
  try {
    const response = await fetch(`http://localhost:3000/user/updatevehicle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return null;
    } else {
      const car = await response.json();
      return car;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;
    const type = body.type;
    const values = body.values;
    const data: CatInformation = {};

    if (type == "name") {
      const car_name = values[0];
      if (!car_name) {
        return res
          .status(400)
          .json({ message: "**กรุณากรอกชื่อรถยนต์ให้เรียบร้อย" });
      }
      data["name"] = car_name;
    }

    if (type == "registrationId") {
    }

    if (type == "maximumCapacity") {
    }

    if (type == "province") {
    }

    const token = req.cookies.token;

    const car = await editCarInformation(token, data);

    if (!car) {
      return res.status(400).json({
        success: false,
        message: "** เกิดข้อผิดพลาดขึ้น โปรดลองใหม่อีกครั้ง",
      });
    }

    setCookie(
      "car",
      { ...car },
      {
        req,
        res,
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV !== "development",
        sameSite: true,
      }
    );

    return res.status(200).json({ success: true });
  } else {
    return res.redirect("/404");
  }
}
