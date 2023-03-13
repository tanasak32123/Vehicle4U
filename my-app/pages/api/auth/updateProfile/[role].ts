// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserProfile } from "libs/auth/updateUserProfile";
import { setCookie } from "cookies-next";
import UserProfile from "types/UserProfile";

function containsNumbers(str: string) {
  return /[0-9]/.test(str);
}

function containsOnlyNumbers(str: string) {
  return /^\d+$/.test(str);
}

function containsSpecialChars(str: string) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

function validateUsername(str: string) {
  const usernameRegex = /\W/;
  return usernameRegex.test(str);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    let { role } = req.query;
    const body = req.body;
    const type = body.type;
    const values = body.values;
    const data: UserProfile = {};

    if (type == "name") {
      const first_name = values["0"];
      const last_name = values["1"];
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

      data["first_name"] = first_name;
      data["last_name"] = last_name;
    }

    if (type == "username") {
      const username = values["0"];
      if (!username) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย" });
      } else if (validateUsername(username)) {
        return res.status(400).json({
          message:
            "** กรุณาเปลี่ยนชื่อผู้ใช้ เนื่องจากสามารถมีเพียงตัวอักษรและตัวเลขเท่านั้น",
        });
      }

      data["username"] = username;
    }

    if (type == "password") {
      const password = values["0"];
      if (!password) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกรหัสผ่านให้เรียบร้อย" });
      } else if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "** password ของคุณมีความยาวน้อยกว่า 6 ตัว" });
      }

      data["password"] = password;
    }

    if (type == "tel") {
      const tel = values["0"];
      if (!tel) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย" });
      } else if (!containsOnlyNumbers(tel)) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น" });
      } else if (tel.length != 10) {
        return res
          .status(400)
          .json({ message: "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน" });
      }

      data["tel"] = tel;
    }

    if (type == "citizen_id") {
      const cid = values["0"];
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

      data["citizen_id"] = cid;
    }

    if (type == "driving_license_id" || type == "add_driving_license_id") {
      const d_license_id = values["0"];
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

      data["driving_license_id"] = d_license_id;

      if (type == "add_driving_license_id") {
        role = "renter";
        data["is_renter"] = true;
      }
    }

    if (type == "payment_channel" || type == "add_payment_channel") {
      const payment = values["0"];
      if (!payment) {
        return res
          .status(400)
          .json({ message: "** กรุณาเลือกช่องทางการรับเงินให้เรียบร้อย" });
      }

      data["payment_channel"] = payment;

      if (type == "add_payment_channel") {
        role = "provider";
        data["is_provider"] = true;
      }
    }

    const token = req.cookies.token;

    const user = await updateUserProfile(token, data);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "** เกิดข้อผิดหลาดขึ้น โปรดลองใหม่อีกครั้ง",
      });
    }

    return res.status(200).json({ success: true, user });
  } else {
    return res.redirect("/404");
  }
}
