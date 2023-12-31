export const updateUserProfile = async (
  token: string | undefined,
  data: object
) => {
  const user = await fetch(
    process.env.BACKEND_HOST +
      ":" +
      process.env.BACKEND_PORT +
      `/user/editProfile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return user;
};
