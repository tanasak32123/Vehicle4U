import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handlePostFormReq = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies?.token;
  const role = req.cookies?.currentRole
    ? req.cookies?.currentRole
    : req.cookies?.role;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  if (!role || role !== "provider") {
    return res.status(401).json({ msg: "Not have permission to access." });
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

  if (!files["image"]) {
    return res
      .status(400)
      .json({ success: false, msg: "Image files not found." });
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
    return res.status(500).json({ success: false });
  });

  await fs
    .unlink(process.cwd() + "/public/images/vehicles/" + fields.oldFilename)
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ success: false });
    });

  const vehicle = await fetch("http://localhost:3000/user/updatevehicle", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: fields.id, imagename: filename }),
  })
    .then((response) => {
      if (!response.ok) {
        return res.status(500).json({ success: false });
      }
      return response.json();
    })
    .then((response) => {
      return response.vehicle;
    });

  return res.status(200).json({ success: true, vehicle });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(404).send("method not found");
  }

  await handlePostFormReq(req, res);
};

export default handler;
