// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const errors = {
      fName: "",
      lName: "",
      username: "",
      pw: "",
      tel: "",
      citizenID: "",
      drivenID: "",
      payment: "",
    };

    const body = req.body;

    if (!body.fName) {
      errors.fName = "** กรุณากรอกชื่อให้เรียบร้อย";
    }

    if (!body.lName) {
      errors.lName = "** กรุณากรอกนามสกุลให้เรียบร้อย";
    }

    if (!body.username) {
      errors.username = "** กรุณากรอก username ให้เรียบร้อย";
    }

    if (!body.pw) {
      errors.pw = "** กรุณากรอก password ให้เรียบร้อย";
    } else if (body.pw.length < 6) {
      errors.pw = "** password ของคุณมีความยาวน้อยกว่า 6 ตัว";
    }

    if (!body.tel) {
      errors.tel = "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย";
    } else if (body.tel.length != 10) {
      errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
    }

    if (!body.citizenID) {
      errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
    } else if (body.citizenID.length != 13) {
      errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
    }

    if (body.role == "renter") {
      if (!body.drivenID) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
      } else if (body.drivenID.length != 8) {
        errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
      }
    }

    if (body.role == "provider") {
      if (!body.payment) {
        errors.payment = "** กรุณาเลือกวิธีการรับเงินให้เรียบร้อย";
      }
    }

    for (let e in errors) {
      if (errors[`${e}`] != "") {
        return res.status(400).json({ message: "Invalidation", errors });
      }
    }

    return res.status(200).json({ message: `validated form` });
  } else {
    res.redirect("/404");
  }
}
