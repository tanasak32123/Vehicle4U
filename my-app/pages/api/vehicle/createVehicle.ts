import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import validation from "libs/validation";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handlePostFormReq = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const form = formidable();

  const formData: Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }> = new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = await formData;

  let imgFound = false;

  if (files["image"]) imgFound = true;

  let feedback: { [index: string]: any } = {
    name: "",
    maxSeat: "",
    province: "",
    regId: "",
  };

  if (!validation.required(fields.name as string)) {
    feedback.name = "** โปรดใส่ชื่อรถของคุณ";
  }

  if (!validation.required(fields.maximumCapacity as string)) {
    feedback.maxSeat = "** โปรดใส่จำนวนที่นั่งของรถ";
  } else if (!validation.numberOnly(fields.maximumCapacity as string)) {
    feedback.maxSeat = "** โปรดใส่จำนวนที่นั่งเป็นตัวเลขเท่านั้น";
  } else if (Number(fields.maximumCapacity) <= 0) {
    feedback.maxSeat = "** โปรดใส่จำนวนที่นั่งที่มีค่ามากกว่า 0";
  }

  if (!validation.required(fields.province as string)) {
    feedback.province = "** โปรดเลือกจังหวัดของรถ";
  } else if (!validation.thaiLangOnly(fields.province as string)) {
    feedback.province = "** โปรดชื่อจังหวัดต้องเป็นภาษาไทยเท่านั้น";
  }

  if (!validation.required(fields.registrationId as string)) {
    feedback.regId = "** โปรดใส่เลขทะเบียนของรถ";
  } else if (!validation.car_license_plate(fields.registrationId as string)) {
    feedback.regId = "** โปรดใส่เลขทะเบียนให้ถูกต้อง ตัวอย่างเช่น กข 1234";
  }

  for (let k in feedback) {
    if (feedback[k]) {
      return res.status(400).json({ success: false, feedback, imgFound });
    }
  }

  if (!imgFound) {
    return res.status(400).json({ success: false, feedback, imgFound: false });
  }

  const file = files["image"] as any;
  const filename = Date.now().toString() + "_" + file.originalFilename;
  const oldPath = file.filepath;
  const newPath = path.join(
    process.cwd(),
    "public",
    "images",
    "vehicles",
    filename
  );

  const rawData = await fs.readFile(oldPath);

  await fs
    .readdir(path.join(process.cwd() + "/public", "/images", "/vehicles"))
    .catch(async (err) => {
      console.log(err);
      await fs.mkdir(
        path.join(process.cwd() + "/public", "/images", "/vehicles")
      );
    });

  await fs.writeFile(newPath, rawData).catch((err) => {
    console.log(err);
    return res.status(500).json({ success: false, imgFound });
  });

  const ok = await fetch("http://localhost:3000/vehicle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...fields, imagename: filename }),
  }).then((res) => {
    return res.ok;
  });

  if (!ok) {
    return res.status(500).json({ success: false, imgFound });
  }

  return res.status(200).json({ success: true, imgFound });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(404).send("method not found");
  }

  await handlePostFormReq(req, res);
};

export default handler;
