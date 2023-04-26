// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const token = req.cookies?.token;

      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      await fetch(
        process.env.BACKEND_HOST +
          ":" +
          process.env.BACKEND_PORT +
          `/comments?vehicleId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong...");
          }
          return response.json();
        })
        .then((response) => {
          return res
            .status(200)
            .json({ success: true, comment: response.comment });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server",
          });
        });
      break;
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

      await fetch(
        process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT + "/comments",
        {
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
        }
      )
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
      break;
    }
    case "PATCH": {
      const { reply, id } = req.body;
      const token = req.cookies?.token;

      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      if (!reply || !id)
        return res.status(400).json({ success: false, message: "Bad request" });

      await fetch(
        process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT + "/comments",
        {
          method: req.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reply,
            id,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong...");
        })
        .then((response) => {
          // console.log(response);
          return res.status(200).json({ success: true });
        })
        .then((err) => {
          console.log(err);
          res.status(500).json({ success: false, message: "Internal Server" });
        });
      break;
    }
    default: {
      return res.status(404).redirect("/404");
    }
  }
}
