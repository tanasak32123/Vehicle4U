import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    let errors: { [index: string]: any } = {
        choose_payment:"",
    };

    if (req.method == "POST") {
        const body = req.body;

        const mobile = body.mobile;
        const card = body.card;

        var check = card || mobile;

        if (!check){
            errors.choose_payment = "** โปรดระบุช่องทางการชำระเงิน";
            return res.status(400).json({
                success: false,
                message: "** โปรดตรวจสอบวันและเวลาในการรับ-คืนรถของคุณ",
                errors,
              });
        }
        return res.status(200).send('success');

    }
    
  }