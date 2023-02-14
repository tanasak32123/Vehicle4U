// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import defaultOptions from "../../libs/apiDefault";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const getUser = async () => {
    const cookie: string = getCookie("user") as string;
    const json = JSON.parse(cookie);
    const user = await fetch(`/user/${json.id}`, {
      ...defaultOptions,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem("token"),
      },
      method: "GET",
    });
    return user;
  };

  return res.status(200).json({ success: true, user: getUser() });
}
