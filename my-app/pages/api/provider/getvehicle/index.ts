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
    //     request_id: 53,
    //     car_id: 3,
    //     imagename: '1680237481746_Screenshot 2566-03-31 at 11.37.46.png',
    //     car_name: 'suzuki',
    //     registrationId: 'ฟน 1234',
    //     renter_firstname: 'โชติพัฒน์',
    //     renter_lastname: 'อัศวปยุกต์กุล',
    //     tel: '0618526887',
    //     contact: '0618526887',
    //     rent_place: '',
    //     maximumCapacity: 2,
    //     created_at: '2023-04-02T03:35:07.013Z',
    //     updated_at: '2023-04-02T03:35:07.013Z',
    //     status: 'accepted'
    //   },{
    //     request_id: 53,
    //     car_id: 3,
    //     imagename: '1680237481746_Screenshot 2566-03-31 at 11.37.46.png',
    //     car_name: 'suzuki',
    //     registrationId: 'ฟน 1234',
    //     renter_firstname: 'โชติพัฒน์',
    //     renter_lastname: 'อัศวปยุกต์กุล',
    //     tel: '0618526887',
    //     contact: '0618526887',
    //     rent_place: '',
    //     maximumCapacity: 2,
    //     created_at: '2023-04-02T03:35:07.013Z',
    //     updated_at: '2023-04-02T03:35:07.013Z',
    //     status: 'pending'
    //   },{
    //     request_id: 53,
    //     car_id: 3,
    //     imagename: '1680237481746_Screenshot 2566-03-31 at 11.37.46.png',
    //     car_name: 'suzuki',
    //     registrationId: 'ฟน 1234',
    //     renter_firstname: 'โชติพัฒน์',
    //     renter_lastname: 'อัศวปยุกต์กุล',
    //     tel: '0618526887',
    //     contact: '0618526887',
    //     rent_place: '',
    //     maximumCapacity: 2,
    //     created_at: '2023-04-02T03:35:07.013Z',
    //     updated_at: '2023-04-02T03:35:07.013Z',
    //     status: 'rejected'
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
