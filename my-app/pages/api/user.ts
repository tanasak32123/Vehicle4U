// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import defaultOptions from "../../libs/apiDefault";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const getUser = async () => {
    const user = await fetch(`/user/${getCookie("id")}`, {
      ...defaultOptions,
      method: "GET",
    });
    return user;
  };

  return res.status(200).json({ success: true, user: getUser() });
}
