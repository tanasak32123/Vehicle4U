// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorSignupValidate } from "../../../interfaces/ErrorSignupValidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const errors: ErrorSignupValidate = {};
    const body = req.body;
    const role = req.query.role;

    if (!body.first_name) {
      errors.fName = "** กรุณากรอกชื่อให้เรียบร้อย";
    }

    if (!body.last_name) {
      errors.lName = "** กรุณากรอกนามสกุลให้เรียบร้อย";
    }

    if (!body.username) {
      errors.username = "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย";
    }

    if (!body.password) {
      errors.pw = "** กรุณากรอกรหัสผ่านให้เรียบร้อย";
    } else if (body.password.length < 6) {
      errors.pw = "** password ของคุณมีความยาวน้อยกว่า 6 ตัว";
    }

    if (!body.tel) {
      errors.tel = "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย";
    } else if (body.tel.length != 10) {
      errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
    }

    if (!body.citizen_id) {
      errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
    } else if (body.citizen_id.length != 13) {
      errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
    }

    if (role == "renter") {
      if (!body.driving_license_id) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
      } else if (body.driving_license_id.length != 8) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน";
      }
    }

    if (role == "provider") {
      if (!body.payment_channel) {
        errors.payment = "** กรุณาเลือกวิธีการรับเงินให้เรียบร้อย";
      }
    }

    for (let e in errors) {
      if (errors[`${e}`] != "") {
        return res.status(400).json({ success: false, errors });
      }
    }

    await fetch(`http://localhost:3000/auth/signup/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        if (data.message == "username exist") {
          errors.username = "** ชื่อผู้ใช้นี้ถูกใช้แล้ว";
          return res.status(400).json({
            success: false,
            errors,
          });
        } else {
          errors.citizenID = "** หมายเลขบัตรประชนนี้ถูกใช้แล้ว";
          return res.status(400).json({
            success: false,
            errors,
          });
        }
      } else {
        return res
          .status(201)
          .json({ success: true, message: "created successfully" });
      }
    });
  } else {
    res.redirect("/404");
  }
}
