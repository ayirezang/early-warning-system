import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      alert("Logged in!");
    } catch (err) {
      setError({
        email: "",
        password: err.response?.data?.msg || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <h2 className="text-center">Login</h2>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 rounded-xl">
              <MdOutlineSchool size={32} />
            </div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-center mt-1">
              Early Warning System Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-lg px-4 py-2">
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
              <label className="text-sm block mb-1">Password</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-lg px-4 py-2">
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
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer"
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
