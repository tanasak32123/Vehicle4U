// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const body = req.body;

    if (!body.values["0"]) {
      if (body.type == "name") {
        //update fname
        //then
        if (!body.values["1"]) {
          //update lname
        }
      }

      if (body.type == "username") {
        //update username
      }

      if (body.type == "password") {
        //update password
      }

      if (body.type == "tel") {
        // update tel
      }

      if (body.type == "cid") {
        //update cid
      }

      if (body.type == "dlicense") {
        //update dlicense
      }

      if (body.type == "payment") {
        //update payment
      }
    }

    return res.status(200).json({ success: true, body });
  } else {
    res.redirect("/404");
  }
}
