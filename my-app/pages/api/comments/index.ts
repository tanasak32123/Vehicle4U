// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const token = req.cookies?.token;

      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      await fetch("http://localhost:3000/searchComments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong...");
          }
          return response.json();
        })
        .then((response) => {
          return res.status(200).json({ success: true, ...response });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server",
          });
        });
    }
    case "POST": {
      const body = req.body;
      const score = body.score;
      let error;

      if (score === 0) {
        error = "โปรดเลือกคะแนนความพึงพอใจ";
        return res.status(400).json({
          success: false,
          message: "** โปรดกรอกคะแนนในการเช่ารถ",
          error,
        });
      }

      const token = req.cookies?.token;

      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      await fetch("http://localhost:3000/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          request_id: body.req_id,
          message: body.review,
          score: body.score,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong...");
          }
          return response.json();
        })
        .then((response) => {
          return res.status(200).json({ success: true, ...response });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server",
          });
        });
    }
    default: {
      return res.status(404).redirect("/404");
    }
  }
}
