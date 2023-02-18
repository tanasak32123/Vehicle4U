// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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

function validateUsername(str) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(str);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const body = req.body;

    if (body.type == "name") {
      const first_name = body.values["0"];
      const last_name = body.values["1"];
      if (!first_name && !last_name) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกชื่อและนามสกุลของคุณให้เรียบร้อย" });
      } else if (!last_name) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกนามสกุลให้เรียบร้อย" });
      } else if (!first_name) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกชื่อจริงให้เรียบร้อย" });
      } else if (
        containsSpecialChars(first_name) ||
        containsNumbers(first_name)
      ) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น" });
      } else if (
        containsSpecialChars(last_name) ||
        containsNumbers(last_name)
      ) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น" });
      }
    }

    if (body.type == "username") {
      const username = body.values["0"];
      if (!username) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย" });
      } else if (!validateUsername(username)) {
        return res
          .status(400)
          .json({ message: "** กรุณาเพิ่มตัวอักษร a-z หรือ 0-9 ในชื่อผู้ใช้" });
      }
    }

    if (body.type == "password") {
      const password = body.values["0"];
      if (!password) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกรหัสผ่านให้เรียบร้อย" });
      } else if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "** password ของคุณมีความยาวน้อยกว่า 6 ตัว" });
      }
    }

    if (body.type == "tel") {
      const tel = body.values["0"];
      if (!tel) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย" });
      } else if (tel.length != 10) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน" });
      } else if (!containsOnlyNumbers(tel)) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น" });
      }
    }

    if (body.type == "cid") {
      const cid = body.values["0"];
      if (!cid) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย" });
      } else if (!containsOnlyNumbers(cid)) {
        return res.status(400).json({
          message: "** กรุณากรอกหมายเลขบัตรประชาชนเป็นหมายเลขเท่านั้น",
        });
      } else if (cid.length != 13) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน" });
      }
    }

    if (body.type == "dlicense") {
      const d_license_id = body.values["0"];
      if (!d_license_id) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย" });
      } else if (!containsOnlyNumbers(d_license_id)) {
        return res.status(400).json({
          message: "** กรุณากรอกหมายเลขใบชับชี่เป็นหมายเลขเท่านั้น",
        });
      } else if (d_license_id.length != 8) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน" });
      }
    }

    if (body.type == "payment") {
      const payment = body.values["0"];
      if (!payment) {
        return res
          .status(400)
          .json({ message: "** กรุณาเลือกช่องทางการรับเงินให้เรียบร้อย" });
      }
    }

    return res.status(200).json({ success: true });
  } else {
    res.redirect("/404");
  }
}
