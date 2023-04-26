import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("method not found");
  }

  const token = req.cookies?.token;
  const role = req.cookies?.currentRole
    ? req.cookies?.currentRole
    : req.cookies?.role;

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
    await fetch(
      process.env.BACKEND_HOST +
        ":" +
        process.env.BACKEND_PORT +
        "/renting-request/renter",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
