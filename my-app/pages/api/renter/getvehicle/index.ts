import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("method not found");
  }

  const token = req.cookies?.token;
  const role = req.cookies?.currentRole;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, msg: "Unauthorized." });
  }

  if (!role || role !== "renter") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      msg: "Not have permission to access.",
    });
  }

  if (token && role === "renter") {
    // return res.status(200).json([{
    //   id: 23,
    //   registrationId: "กถ 3210",
    //   providerName: "chotipat",
    //   providerContact: "0618526887",
    //   name: "car02",
    //   imagename: "1679988936178_Screenshot 2566-03-28 at 14.35.19.png",
    //   maximumCapacity: 4,
    //   startDate: "2023-03-22",
    //   startTime: "12:30",
    //   endDate: "2023-04-22",
    //   endTime: "16:00",
    // },{
    //     id: 23,
    //     registrationId: "กถ 3210",
    //     providerName: "chotipat",
    //     providerContact: "0618526887",
    //     name: "car02",
    //     imagename: "1679988936178_Screenshot 2566-03-28 at 14.35.19.png",
    //     maximumCapacity: 4,
    //     startDate: "2023-03-22",
    //     startTime: "12:30",
    //     endDate: "2023-04-22",
    //     endTime: "16:00",
    //   }]);
    await fetch("http://localhost:3000/renting-request/renter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("----------------------");
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong ...");
      })
      .then((response) => {
        console.log(response[0]);
        return res.status(200).json({
          success: true,
          statusCode: 200,
          response,
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, statusCode: 500, err: err });
      });
  }
};

export default handler;
