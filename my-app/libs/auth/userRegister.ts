import UserSignUp from "types/UserSignUp";

export const userRegister = async (data: UserSignUp, role: string) => {
  try {
    const res = await fetch(`http://localhost:3000/auth/signup/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message };
    }

    return { success: true, message: "created successfully." };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
