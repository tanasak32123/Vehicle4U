// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  fname: string;
  lname: string;
  username: string;
  password: string;
  tel: string;
  cid: string;
  dlicense: string;
  payment: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user: User = {
    fname: "tanasak",
    lname: "pusawatwong",
    username: "tanasak32123",
    password: "32123",
    tel: "0818318928",
    cid: "1102200182381",
    dlicense: "1102200112345",
    payment: "",
  };

  return res.status(200).json({ success: true, data: user });
}
