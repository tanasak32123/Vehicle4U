export const getUser = async (token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};
