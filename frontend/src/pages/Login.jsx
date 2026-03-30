import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { loginApi } from "../api/api";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let newError = { email: "", password: "" };

    const emailCond = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailCond.test(formData.email)) {
      newError.email = "Please enter a valid email (email@domain.com)";
    }

    const passwordCond = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/;
    if (!formData.password.trim()) {
      newError.password = "Password is required";
    } else if (!passwordCond.test(formData.password)) {
      newError.password = "Enter a valid password (Password2@)";
    }

    setError(newError);
    return !newError.email && !newError.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      console.log("login data:", formData);
      const data = await loginApi(formData);
      console.log("login response:", data);
      
      setUser(data.user);

      // alert("Logged in!");
      navigate("/dashboard");
    } catch (error) {
      console.error("full error:", error.response?.data);
      alert(
        "sign up failed:" + (error.response?.data.message || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <h2 className="text-center">EWS Portal</h2>
      </header> */}
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3  bg-blue-100 rounded-full mb-2 cursor-pointer">
              <MdOutlineSchool size={32} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-md text-center mt-1">
              Early Warning System Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-md block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-xl px-4 py-2 focus-within:border-blue-500">
                <MdOutlineEmail />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pat@gmail.com"
                  className="focus:outline-none flex-1"
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-md block mb-1">Password</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-xl px-4 py-2 focus:ring-2 focus-within:border-blue-500">
                <TbLockPassword />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="flex-1 focus:outline-none"
                />
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white cursor-pointer mt-2"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>

            <p className="text-center">
              Don't have an account yet?{" "}
              <span className="text-blue-500">
                <Link to="/">Signup</Link>
              </span>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
