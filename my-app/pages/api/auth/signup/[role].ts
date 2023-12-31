import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/libs/auth/createUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(404).redirect("/404");
  }

  const body = req.body;
  const role = req.query.role as string;

  let errors: { [index: string]: any } = {
    fname: "",
    lname: "",
    username: "",
    pwd: "",
    tel: "",
    cid: "",
    drivenId: "",
    payment: "",
  };

  if (!body.first_name) {
    errors.fname = "** กรุณากรอกชื่อให้เรียบร้อย";
  } else if (
    containsSpecialChars(body.first_name) ||
    containsNumbers(body.first_name)
  ) {
    errors.fname = "** กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น";
  }

  if (!body.last_name) {
    errors.lname = "** กรุณากรอกนามสกุลให้เรียบร้อย";
  } else if (
    containsSpecialChars(body.last_name) ||
    containsNumbers(body.last_name)
  ) {
    errors.lname = "** กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น";
  }

  if (!body.username) {
    errors.username = "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย";
  } else if (validateUsername(body.username)) {
    errors.username =
      "** กรุณาเปลี่ยนชื่อผู้ใช้ เนื่องจากสามารถมีเพียงตัวอักษรและตัวเลขเท่านั้น";
  }

  if (!body.password) {
    errors.pwd = "** กรุณากรอกรหัสผ่านให้เรียบร้อย";
  } else if (body.password.length < 6) {
    errors.pwd = "** password ของคุณมีความยาวน้อยกว่า 6 ตัว";
  }

  if (!body.tel) {
    errors.tel = "** กรุณากรอกเบอร์โทรศัพท์ให้เรียบร้อย";
  } else if (!containsOnlyNumbers(body.tel)) {
    errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์เป็นหมายเลขเท่านั้น";
  } else if (body.tel.length != 10) {
    errors.tel = "** กรุณากรอกหมายเลขโทรศัพท์ให้ครบถ้วน";
  }

  if (!body.citizen_id) {
    errors.cid = "** กรุณากรอกหมายเลขบัตรประชาชนให้เรียบร้อย";
  } else if (!containsOnlyNumbers(body.citizen_id)) {
    errors.cid = "** กรุณากรอกหมายเลขบัตรประชาชนเป็นหมายเลขเท่านั้น";
  } else if (body.citizen_id.length != 13) {
    errors.cid = "** กรุณากรอกหมายเลขบัตรประชาชนให้ครบถ้วน";
  }

  if (role == "renter") {
    if (!body.driving_license_id) {
      errors.drivenId = "** กรุณากรอกหมายเลขใบขับขี่ให้เรียบร้อย";
    } else if (!containsOnlyNumbers(body.driving_license_id)) {
      errors.drivenId = "** กรุณากรอกหมายเลขใบชับชี่เป็นหมายเลขเท่านั้น";
    } else if (body.driving_license_id.length != 8) {
      errors.drivenId = "** กรุณากรอกหมายเลขใบขับขี่ให้ครบถ้วน";
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

  const response = await createUser(body, role);

  if (!response.success) {
    if (response.message == "username exist") {
      errors.username = "** ชื่อผู้ใช้นี้ถูกใช้แล้ว";
      return res.status(400).json({
        success: false,
        errors,
      });
    } else {
      errors.cid = "** หมายเลขบัตรประชนนี้ถูกใช้แล้ว";
      return res.status(400).json({
        success: false,
        errors,
      });
    }
  }

  return res
    .status(201)
    .json({ success: true, message: "created successfully" });
};

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

export default handler;
