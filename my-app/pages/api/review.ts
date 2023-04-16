// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
//   let error: { [index: string]: any } = { };

  let error;
  if (req.method != "POST") {
    return res.status(404).redirect("/404");
  }

  const body = req.body;
  const score = body.score;
  
  if ( score === 0 ) {
    error = "โปรดเลือกคะแนนความพึงพอใจ";
    return res.status(400).json({
        success: false,
        message: "** โปรดกรอกคะแนนในการเช่ารถ",
        error,
    });
  }
  const token = req.cookies?.token;
  await fetch("http://localhost:3000/comments", {
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
        return res.status(404).json({
            success: false,
            message: "Not receive ok status from backend"
        });
      } else {
        return response.json();
      }
    })
    .then((response) => {
      console.log(response);
      return res.status(200).json({ success: true, ...response });
    });
}
