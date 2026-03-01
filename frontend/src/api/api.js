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

export const signUpApi = async (firstName, lastName, email, password, role) => {
  try {
    const response = await api.post("/signup", {
      firstName,
      lastName,
      email,
      password,
      role,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("sign up error:", error);
    console.error("error response:", error.response);
    throw new Error(error.response?.data?.message || "sign up failed");
  }
};
//login
export const loginApi = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    Cookie.set("token", response.data.token, { expires: 5 });
    return response.data;
  } catch (error) {
    console.error("login error: ", error);
    console.error("error response:", error.response);
    throw new Error(error.response?.data?.message || "login failed");
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
