export const signin = async (
  username: string,
  password: string,
  role: string
): Promise<any> => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role: role == "provider" ? 1 : 0,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });

  return response;
};
