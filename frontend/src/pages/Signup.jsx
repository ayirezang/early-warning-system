import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    subject: "",
  });
  //handlechange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validate = () => {
    let newError = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      subject: "",
    };
    if (!formData.firstName.trim())
      newError.firstName = "First name is required";
    if (!formData.lastName.trim()) newError.lastName = "Last name is required";

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
      newError.password = "Enter a valid password (e.g. Password2)";
    }

    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) newError.role = "Please select your role";
    if (formData.role === "teacher" && !formData.subject)
      newError.subject = "Please select a subject";
    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };

  //role change
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role, subject: "" }));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      console.log("signup data:", formData);
      alert("account created");
      navigate("/dashboard");
    } catch (error) {
      setError((prev) => ({
        ...prev,
        email: error.response?.data?.msg || "something",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <h2 className="text-center">Create Account</h2>
      </header>
      {/**main content */}
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        {/**whole content */}
        <div className="w-full max-w-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6 ">
            {/**icon and headings */}
            <div className="p-3  rounded-xl ">
              <MdOutlineSchool size={32} />
            </div>
            <h2 className="text-2xl font-bold">Early Warning System</h2>
            <p className="text-sm text-center mt-1">
              Join our student performance monitoring platform for educational
              institutions.
            </p>
          </div>
          {/**form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/**first & last nae */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm block mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Pat"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-300 "
                ></input>
                {error.firstName && (
                  <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                )}
              </div>
              {/**last nmae */}
              <div className="flex-1">
                <label className="text-sm block mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Joe"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-300 "
                ></input>
                {error.lastName && (
                  <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
                )}
              </div>
            </div>
            {/**email */}
            <div>
              <label className="text-sm block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:boder-blue-300 ">
                <MdOutlineEmail />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pat@gmail.com "
                  className="focus:outline-none   flex-1"
                ></input>
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            {/**password */}
            <div>
              <label className="text-sm block mb-1">Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-lg px-4 py-2 ">
                <TbLockPassword />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="flex-1 "
                ></input>

                <IoEyeOutline />
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
            {/**confirm */}
            <div>
              <label className="text-sm block mb-1"> Confirm Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-lg px-4 py-2 ">
                <TbLockPassword />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="*******"
                  className="flex-1 "
                ></input>

                <IoEyeOutline />
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
            {/**role */}
            <div className="flex gap-4 ">
              <div className="flex-1">
                <label className="text-sm block mb-1">Your Role</label>
                <div className="flex gap-4">
                  {/* Admin Button */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("admin")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-lg px-4 py-2 
            ${
              formData.role === "admin"
                ? "bg-blue-600 text-white border-blue-600" // selected style
                : "border-gray-400 text-gray-600" // unselected style
            }`}
                  >
                    <MdOutlineAdminPanelSettings />
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("teacher")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-lg px-4 py-2 
            ${
              formData.role === "teacher"
                ? "bg-blue-600 text-white border-blue-600" // selected style
                : "border-gray-400 text-gray-600" // unselected style
            }`}
                  >
                    <IoSchoolOutline />
                    Teacher
                  </button>
                </div>
                {error.role && (
                  <p className="text-red-500 text-sm mt-1">{error.role}</p>
                )}
              </div>
            </div>
            {/**subject role */}
            {formData.role === "teacher" && (
              <div>
                <label className="text-sm block mb-1 ">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:border-blue-300 text-gray-500"
                >
                  <option value="">select subject</option>
                  <option value="maths">Mathematics</option>
                  <option value="science">Integrated Science</option>
                  <option value="english">English Language</option>
                  <option value="social studies">Social Studies</option>
                </select>
                {error.subject && (
                  <p className="text-red-500 text-sm mt-1">{error.subject}</p>
                )}
              </div>
            )}
            {/**create my account button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-2 bg-blue-600 text-white cursor-pointer"
            >
              Create My Account
            </button>
            <p className="text-center cursor-pointer">
              Already have an account?{" "}
              <span className="text-blue-500">
                <Link to="/login">Log in </Link>
              </span>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
