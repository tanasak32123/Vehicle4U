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
  const req_id = body.req_id;
  const review = body.review;
  var isblank = true;
  
  for (var i = 0; i < review.length; i++) {
    if (review.charAt(i) !== " " ){
        isblank = false;
    }
  }

  if (isblank) {
    error = "กรุณาใส่ข้อความสำหรับการรีวิว";
    return res.status(400).json({
        success: false,
        message: "** โปรดใส่ข้อมูลสำหรับการรีวิวให้เรียบร้อย",
        error,
    });
  }

  const token = req.cookies?.token;

  // ขอ path backend 
  await fetch("http://localhost:3000/renting-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
    //เช็คตัวแปรจาก backend
      request_id: body.req_id,
      message: body.review,
      score: 10,
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
