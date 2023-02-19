// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const token = req.cookies.token;
      if (token) {
        const user = JSON.parse(req.cookies.user as string);
        await fetch(`http://localhost:3000/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok) {
            return res.status(401).json({ message: "Unauthorized" });
          } else {
            return res.status(200).json({ user });
          }
        });
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  } else {
    res.redirect("/404");
  }
}
