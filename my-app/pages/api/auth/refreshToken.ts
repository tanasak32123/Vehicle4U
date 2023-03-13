import type { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("Unauthorized");
  }

  const response = await fetch("http://localhost:3000/auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const accessToken = await response.json();
  return res.status(200).json({ accessToken });
};

export default handler;
