// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorUpdateProfileValidate } from "../../interfaces/ErrorUpdateProfileValidate";
import { InputUpdateProfileValidate } from "../../interfaces/InputUpdateProfileValidate";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  function containsNumbers(str) {
    return /[0-9]/.test(str);
  }

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  if (req.method == "POST") {
    const errors: ErrorUpdateProfileValidate = {};

    const body = req.body;

    if (body.type == "name") {
      if (!body.values["0"]) {
        errors.fName = "** กรุณากรอกชื่อให้เรียบร้อย";
      } else {
        if (containsSpecialChars(body.values["0"])) {
          errors.fName = "** กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น";
        }
      }

      if (!body.values["1"]) {
        errors.lName = "** กรุณากรอกนามสกุลให้เรียบร้อย";
      } else {
        if (containsSpecialChars(body.values["1"])) {
          errors.fName = "** กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น";
        }
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
      } else {
        if (body.values["0"].length != 10) {
          errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(body.values["0"])) {
          errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น";
        }
      }
    }

    if (body.type == "cid") {
      //update cid
      if (!body.values["0"]) {
        errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
      } else {
        if (body.values["0"].length != 13) {
          errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(body.values["0"])) {
          errors.citizenID =
            "** กรุณากรอกหมายเลขบัตรประชาชนเป็นหมายเลขเท่านั้น";
        }
      }
    }

    if (body.type == "dlicense") {
      //update dlicense
      if (!body.values["0"]) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
      } else {
        if (body.values["0"].length != 8) {
          errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(body.values["0"])) {
          errors.drivenID = "** กรุณากรอกหมายเลขใบชับชี่เป็นหมายเลขเท่านั้น";
        }
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

    return res.status(200).json({ success: true, body });
  } else {
    res.redirect("/404");
  }
}
