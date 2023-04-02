// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  if (req.method == "POST") {
    const body = req.body;

    const token = req.cookies?.token;

    try {
    // ให้ปลื้มสร้าง path เพิ่ม
      await fetch("http://localhost:3000/renting-request/updatestatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          confirm: body.confirm,
          id: body.req_id,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          res.status(400).json({
            success: false,
            message: "** can't receive response ok from back-end",
          });
        } else {
          const user = await response.json();
          res.status(200).json({ success: true, ...user });
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(404).redirect("/404");
  }
}
