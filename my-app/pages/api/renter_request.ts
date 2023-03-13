// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const body = req.body;

    const start = body.startdate.split('-');
    const stop = body.enddate.split('-');
    const start_time = body.starttime.split(':');
    const stop_time = body.endtime.split(':');
    const contact = body.contact;
    var accept = body.accept;

    var start_year = parseInt(start[0]);
    var start_month = parseInt(start[1]);
    var start_date = parseInt(start[2]);

    var stop_year = parseInt(stop[0]);
    var stop_month = parseInt(stop[1]);
    var stop_date = parseInt(stop[2]);

    var death_line_month = start_month + 3;
    var death_line_year = start_year;
    if ( death_line_month > 12 ){
        death_line_year = death_line_year + 1;
        if ( death_line_month == 13 ) {death_line_month = 1;}
        else if ( death_line_month == 14 ) death_line_month = 2; 
        else if ( death_line_month == 15 ) death_line_month = 3; 
    }

    var time = true;
    if ( death_line_year < stop_year){
        time = true;
    }else if ( death_line_year == death_line_year) {
        if ( stop_month == start_month ){
            time = stop_date < start_date;
        }else if ( stop_month < start_month ){
            time = true;
        }else
            time = stop_month > death_line_month;
    }else{
        time = false;
    }

    var cal = /^[0-9]{10}/.test(contact);
    var empt = body.startdate == "" || body.enddate == "" || body.starttime == "" || body.endtime == "" && body.contact != "";


    // console.log(cal);

    if ( empt || !cal || time ) {
      return res.status(400).json({
        success: false,
        message: "โปรดตรวจสอบวันและเวลาในการรับ-คืนรถของคุณ",
      });
    }
    // return res.status(200).send('success');
    const token = req.cookies?.token

    try {
      await fetch("http://localhost:3000/renting-request", { // ถาม path ปลื้ม
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          startdate: body.startdate,
          starttime: body.starttime,
          enddate: body.enddate,
          endtime: body.endtime,
          info: body.info,
          rent_place: body.location,
          carid:body.carid,
          status:body.status,
        }),
      }).then(async (response) => {
        console.log(response.status)
      
        if (!response.ok) {
          res.status(400).json({
            success: false,
            message: "** can't receive response ok from back-end",
          });
        } else {
          const user = await response.json();
          res.status(200).json({ success: true, ...user });
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(404).redirect("/404");
  }
}
