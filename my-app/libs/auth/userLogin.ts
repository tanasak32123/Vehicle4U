export const userLogin = async (
  username: string,
  password: string,
  role: string
) => {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role: role == "provider" ? 1 : 0,
      }),
    });

    if (!res.ok) {
      return null;
    }

    const user = await res.json();

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
