import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("method not found");
  }

  const token = req.cookies?.token;
  const role = req.cookies?.role;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, msg: "Unauthorized." });
  }

  if (!role || role !== "provider") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      msg: "Not have permission to access.",
    });
  }

  if (token && role === "provider") {
    // return res.status(200).json([{
    //   id: 23,
    //   reqid: 0,
    //   registrationId: "กถ 3210",
    //   name: "car02",
    //   imagename: "1679823192406_class_diagram.png",
    //   province: "กระบี่",
    //   maximumCapacity: 3,
    //   deleted_at: null,
    //   status: 'pending',
    //   updated_at: "2023-03-22T07:40:28.601Z",
    //   created_at: "2023-03-22T07:40:28.601Z",
    // },{
    //     id: 23,
    //     reqid: 1,
    //     registrationId: "กถ 3210",
    //     name: "car02",
    //     imagename: "1679823192406_class_diagram.png",
    //     province: "กระบี่",
    //     maximumCapacity: 3,
    //     deleted_at: null,
    //     status: 'reserve',
    //     updated_at: "2023-03-22T07:40:28.601Z",
    //     created_at: "2023-03-22T07:40:28.601Z",
    //   }]);
    await fetch("http://localhost:3000/renting-request/provider", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong ...");
      })
      .then((response) => {
        console.log(response);
        return res.status(200).json({
          success: true,
          statusCode: 200,
        //   vehicles: response[0].vehicles,
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
