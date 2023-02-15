// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorUpdateProfileValidate } from "../../interfaces/ErrorUpdateProfileValidate";
import defaultOptions from "../../libs/apiDefault";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const errors: ErrorUpdateProfileValidate = {};

    const body = req.body;

    if (body.type == "name") {
      if (!body.values["0"]) {
      }

      if (!body.values["1"]) {
      }
    }

    if (body.type == "username") {
      //update username
      if (!body.values["0"]) {
        errors.username = "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย";
      }
    }

    if (body.type == "password") {
      //update password
      if (!body.values["0"]) {
        errors.pw = "** กรุณากรอกรหัสผ่านให้เรียบร้อย";
      } else if (body.values["0"].length < 6) {
        errors.tel = "** password ของคุณมีความยาวน้อยกว่า 6 ตัว";
      }
    }

    if (body.type == "tel") {
      // update tel
      if (!body.values["0"]) {
        errors.tel = "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย";
      } else if (body.values["0"].length != 10) {
        errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
      }
    }

    if (body.type == "cid") {
      //update cid
      if (!body.values["0"]) {
        errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
      } else if (body.values["0"].length != 13) {
        errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
      }
    }

    if (body.type == "dlicense") {
      //update dlicense
      if (!body.values["0"]) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
      } else if (body.values["0"].length != 8) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน";
      }
    }

    if (body.type == "payment") {
      //update payment
      if (!body.values["0"]) {
        errors.payment = "** กรุณาเลือกวิธีการรับเงินให้เรียบร้อย";
      }
    }

    for (let e in errors) {
      if (errors[`${e}`] != "") {
        return res.status(400).json({ success: false, errors });
      }
    }

    const user = JSON.parse(req.cookies.user!);
    const token = req.cookies.token!;
    const response = await fetch(
      `http://localhost:3000/auth/editProfile/${user.id}`,
      {
        ...defaultOptions,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body.profile),
      }
    );

    return res.status(200).json({ success: true, response });
  } else {
    res.redirect("/404");
  }
}
