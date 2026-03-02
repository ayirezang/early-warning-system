import Cookie from "js-cookie";
import axios from "axios";

//
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json ",
  },
});

//signup

export const signUpApi = async (formData) => {
  try {
    const response = await api.post("/signup", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      subject: formData.subject,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("sign up error:", error);
    throw error;
  }
};
//login
export const loginApi = async (formData) => {
  try {
    const response = await api.post("/login", {
      email: formData.email,
      password: formData.password,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("login error: ", error);

    throw error;
  }
};
//sign out
export const logOutApi = async () => {
  try {
    const response = await api.post("/logout");
    Cookie.remove("token");
    return response.data;
  } catch (error) {
    console.error("logoOut error:", error);
    console.error("error response:", error.response);
    throw new Error(error.response?.data?.message || "logout failed");
  }
};
