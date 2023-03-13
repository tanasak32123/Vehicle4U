export const updateUserProfile = async (
  token: string | undefined,
  data: object
) => {
  try {
    const response = await fetch(`http://localhost:3000/user/editProfile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return null;
    } else {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
