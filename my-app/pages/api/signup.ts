// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tel: string;
  citizen_id: string;
  is_provider: boolean;
  is_renter: boolean;
  payment_channel: string;
  driving_license_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      errors.username = "** กรุณากรอกชื่อผู้ใช้ให้เรียบร้อย";
    }

    if (!body.pw) {
      errors.pw = "** กรุณากรอกรหัสผ่านให้เรียบร้อย";
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
      } else if (body.drivenID.length != 13) {
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
        return res.status(400).json({ success: false, errors });
      }
    }

    const data: Data = {
      username: body.username,
      password: body.pw,
      first_name: body.fName,
      last_name: body.lName,
      tel: body.tel,
      citizen_id: body.citizenID,
      is_provider: body.role == "provider",
      is_renter: body.role == "renter",
      payment_channel: body.payment,
      driving_license_id: body.drivenID,
    };

    await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 200) {
          return res
            .status(201)
            .json({ success: true, data, status: response.status });
        } else {
          res.redirect("/500");
        }
      })
      .catch((err) => {
        res.redirect("/500");
      });

    // return res.status(200).json({ success: true });
  } else {
    res.redirect("/404");
  }
}
