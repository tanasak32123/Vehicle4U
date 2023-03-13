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
        const response = await fetch(`http://localhost:3000/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const user = await response.json();
          return res.status(200).json({ user });
        }
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
function setCookie(arg0: string, arg1: any, arg2: { maxAge: number }) {
  throw new Error("Function not implemented.");
}
