// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;
    const token = req.cookies?.token;

    await fetch(process.env.BACKEND_URL + "/chat/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        receiverId: body.receiverId,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        return res.status(400).json({
          success: false,
          message: "** can't receive response ok from back-end",
        });
      } else {
        const chat = await response.json();
        return res.status(200).json({ success: true, ...chat });
      }
    });
  } else {
    res.status(404).redirect("/404");
  }
}
