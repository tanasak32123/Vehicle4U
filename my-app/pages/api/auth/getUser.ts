import type { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const token = req.cookies?.token;
    if (!token)
      return res.status(200).json({ status: "SIGNED_OUT", user: null });

    const response = await fetch(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    });

    if (!response.ok)
      return res.status(200).json({ status: "SIGNED_OUT", user: null });

    const user = await response.json();

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    return res.status(200).json({ status: "SIGNED_IN", user });
  } else {
    return res.status(404).redirect("/404");
  }
};

export default handler;
