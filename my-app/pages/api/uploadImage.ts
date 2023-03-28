import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  savedLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  let filename = "";
  if (savedLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images/vehicles");
    options.filename = (name, ext, path, form) => {
      filename = Date.now().toString() + "_" + path.originalFilename;
      return filename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/images", "/vehicles")
    );
  } catch (error) {
    await fs.mkdir(
      path.join(process.cwd() + "/public", "/images", "/vehicles")
    );
  }

  const { fields, files } = await readFile(req, true);
  res.json({ done: "ok", files });
};

export default handler;
