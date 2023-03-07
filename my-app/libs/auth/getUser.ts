export const getUser = async (token: string) => {
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
};
