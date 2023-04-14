import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserProfile } from "libs/auth/updateUserProfile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.redirect("/404");
  }

  const body = req.body;
  const field = body.field;

  const data: { [index: string]: any } = {};

  if (!field)
    return res
      .status(400)
      .json({ success: false, message: "Not have field body" });

  if (field == "first_name") {
    const first_name = body.first_name;
    if (!first_name) {
      return res
        .status(400)
        .json({ success: false, message: "** กรุณากรอกชื่อจริงให้เรียบร้อย" });
    } else if (
      containsSpecialChars(first_name) ||
      containsNumbers(first_name)
    ) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น",
      });
    }
  }

  if (field == "last_name") {
    const last_name = body.last_name;
    if (!last_name) {
      return res
        .status(400)
        .json({ success: false, message: "** กรุณากรอกนามสกุลให้เรียบร้อย" });
    } else if (containsSpecialChars(last_name) || containsNumbers(last_name)) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น",
      });
    }
  }

  if (field == "username") {
    const username = body.username;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย",
      });
    } else if (validateUsername(username)) {
      return res.status(400).json({
        success: false,
        message:
          "** กรุณาเปลี่ยนชื่อผู้ใช้ เนื่องจากสามารถมีเพียงตัวอักษรและตัวเลขเท่านั้น",
      });
    }
  }

  if (field == "password") {
    const password = field.password;
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "** กรุณากรอกรหัสผ่านให้เรียบร้อย" });
    } else if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "** password ของคุณมีความยาวน้อยกว่า 6 ตัว",
      });
    }
  }

  if (field == "tel") {
    const tel = body.tel;
    if (!tel) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย",
      });
    } else if (!containsOnlyNumbers(tel)) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น",
      });
    } else if (tel.length != 10) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน",
      });
    }
  }

  if (field == "citizen_id") {
    const cid = body.citizen_id;
    if (!cid) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย",
      });
    } else if (!containsOnlyNumbers(cid)) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขบัตรประชาชนเป็นหมายเลขเท่านั้น",
      });
    } else if (cid.length != 13) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน",
      });
    }
  }

  if (field == "driving_license_id" || field == "add_driving_license_id") {
    const d_license_id = body.driving_license_id
      ? body.driving_license_id
      : body.add_driving_license_id;
    if (!d_license_id) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย",
      });
    } else if (!containsOnlyNumbers(d_license_id)) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขใบชับชี่เป็นหมายเลขเท่านั้น",
      });
    } else if (d_license_id.length != 8) {
      return res.status(400).json({
        success: false,
        message: "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน",
      });
    }
    if (field == "add_driving_license_id") {
      body.field = "driving_license_id";
      data.is_renter = true;
    }
  }

  if (field == "payment_channel" || field == "add_payment_channel") {
    const payment = body.payment_channel
      ? body.payment_channel
      : body.add_payment_channel;
    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "** กรุณาเลือกช่องทางการรับเงินให้เรียบร้อย",
      });
    }
    if (field == "add_payment_channel") {
      body.field = "payment_channel";
      data.is_provider = true;
    }
  }

  data[`${body.field}`] = body[`${field}`];

  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  const user = await updateUserProfile(token, data);

  if (!user!) {
    return res.status(500).json({
      success: false,
      message: "** เกิดข้อผิดหลาดขึ้น โปรดลองใหม่อีกครั้ง",
    });
  }

  return res.status(200).json({ success: true, user });
};

const containsNumbers = (str: string) => {
  return /[0-9]/.test(str);
};

const containsOnlyNumbers = (str: string) => {
  return /^\d+$/.test(str);
};

const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
};

const validateUsername = (str: string) => {
  const usernameRegex = /\W/;
  return usernameRegex.test(str);
};

export default handler;
