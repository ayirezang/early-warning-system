import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { signUpApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    subject: "",
  });
  const { setFirstName, setLastName, setSubject, setTeacherId } =
    useContext(AuthContext);
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
      const data = await signUpApi(formData);
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setSubject(data.user.subject);
      setTeacherId(data.user._id);
      // alert("account created");
      navigate("/dashboard");
    } catch (error) {
      console.error("full error:", error.response?.data);
      alert(
        "sign up failed:" + (error.response?.data.message || error.message),
      );
      console.error;
      // setError((prev) => ({
      //   ...prev,
      //   email: error.response?.data?.msg || "something",
      // }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <div className="flex flex-col items-center mb-6">
          <div className="p-2.5 bg-blue-100 rounded-full mb-2">
            <FiShield className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Early Warning System
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Student performance monitoring platform
          </p>
        </div>
      </header> */}
      {/**main content */}
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        {/**whole content */}
        <div className="w-full max-w-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6 ">
            {/**icon and headings */}
            <div className=" p-2.5 bg-blue-100 rounded-full mb-2 ">
              <MdOutlineSchool size={32} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold">Early Warning System</h2>
            <p className="text-md text-center mt-1">
              Join our student performance monitoring platform for educational
              institutions.
            </p>
          </div>
          {/**form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/**first & last nae */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-md block mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Pat"
                  className="w-full border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 "
                ></input>
                {error.firstName && (
                  <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                )}
              </div>
              {/**last nmae */}
              <div className="flex-1">
                <label className="text-md block mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Joe"
                  className="w-full border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 "
                ></input>
                {error.lastName && (
                  <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
                )}
              </div>
            </div>
            {/**email */}
            <div>
              <label className="text-md block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:boder-blue-500">
                <MdOutlineEmail />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pat@gmail.com "
                  className="focus:outline-none focus:border-blue-500   flex-1"
                ></input>
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            {/**password */}
            <div>
              <label className="text-md block mb-1">Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-xl px-4 py-2  focus-within:border-blue-500">
                <TbLockPassword />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className="flex-1 cursor-pointer focus:outline-none "
                ></input>

                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
            {/**confirm */}
            <div>
              <label className="text-md block mb-1"> Confirm Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-xl px-4 py-2 focus-within:border-blue-500">
                <TbLockPassword />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="*******"
                  className="flex-1  focus:outline-none"
                ></input>

                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
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
                <label className="text-md block mb-1">Your Role</label>
                <div className="flex gap-4">
                  {/* Admin Button */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("ADMIN")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-xl px-4 py-2
            ${
              formData.role === "ADMIN"
                ? "bg-blue-600 text-white border-blue-600" // selected style
                : "border-gray-400 text-gray-600" // unselected style
            }`}
                  >
                    <MdOutlineAdminPanelSettings />
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("TEACHER")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-lg px-4 py-2
            ${
              formData.role === "TEACHER"
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
            {formData.role === "TEACHER" && (
              <div>
                <label className="text-md block mb-1 ">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-xl px-4 py-2 focus:border-blue-300 text-gray-500"
                >
                  <option value="">select subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English Language</option>
                  <option value="Social Studies">Social Studies</option>
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
              className="w-full rounded-xl px-4 py-2 bg-blue-600 shadow-md shadow-blue-500/20 text-white cursor-pointer mt-2"
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
