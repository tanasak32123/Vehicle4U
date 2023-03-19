import type { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") {
    return res.status(404).redirect("/404");
  }

  const token = req.cookies?.token;

  if (!token)
    return res
      .status(200)
      .json({ status: "SIGNED_OUT", user: null, role: null });

  const user = await fetch(`http://localhost:3000/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!user)
    return res
      .status(200)
      .json({ status: "SIGNED_OUT", user: null, role: null });

  const role = req.cookies?.role;

  return res.status(200).json({ status: "SIGNED_IN", user, role });
};

export default handler;
