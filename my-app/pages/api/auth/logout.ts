// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    deleteCookie("token", { res, req });
    deleteCookie("user", { res, req });
    return res.status(200).redirect("/");
  } else {
    res.status(404).redirect("/404");
  }
}
