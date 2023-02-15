// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorUpdateProfileValidate } from "../../interfaces/ErrorUpdateProfileValidate";
import defaultOptions from "../../libs/apiDefault";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      const first_name = body.values["0"];
      if (!first_name) {
        errors.fName = "** กรุณากรอกชื่อให้เรียบร้อย";
      } else if (
        containsSpecialChars(first_name) ||
        containsNumbers(first_name)
      ) {
        errors.fName = "** กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น";
      }

      const last_name = body.values["1"];
      if (!last_name) {
        errors.lName = "** กรุณากรอกนามสกุลให้เรียบร้อย";
      } else if (
        containsSpecialChars(last_name) ||
        containsNumbers(last_name)
      ) {
        errors.fName = "** กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น";
      }
    }

    if (body.type == "username") {
      //update username
      const username = body.values["0"];
      if (!username) {
        errors.username = "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย";
      }
    }

    if (body.type == "password") {
      //update password
      const password = body.values["0"];
      if (!password) {
        errors.pw = "** กรุณากรอกรหัสผ่านให้เรียบร้อย";
      } else if (password.length < 6) {
        errors.tel = "** password ของคุณมีความยาวน้อยกว่า 6 ตัว";
      }
    }

    if (body.type == "tel") {
      // update tel
      const tel = body.values["0"];
      if (!tel) {
        errors.tel = "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย";
      } else {
        if (tel.length != 10) {
          errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(tel)) {
          errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น";
        }
      }
    }

    if (body.type == "cid") {
      //update cid
      const cid = body.values["0"];
      if (!cid) {
        errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
      } else {
        if (cid.length != 13) {
          errors.citizenID = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(cid)) {
          errors.citizenID =
            "** กรุณากรอกหมายเลขบัตรประชาชนเป็นหมายเลขเท่านั้น";
        }
      }
    }

    if (body.type == "dlicense") {
      //update dlicense
      const d_license_id = body.values["0"];
      if (!d_license_id) {
        errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
      } else {
        if (d_license_id.length != 8) {
          errors.drivenID = "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน";
        }
        if (!containsOnlyNumbers(d_license_id)) {
          errors.drivenID = "** กรุณากรอกหมายเลขใบชับชี่เป็นหมายเลขเท่านั้น";
        }
      }
    }

    if (body.type == "payment") {
      //update payment
      const payment = body.values["0"];
      if (!payment) {
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
