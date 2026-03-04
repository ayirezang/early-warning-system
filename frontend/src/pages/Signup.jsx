// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   MdOutlineEmail,
//   MdOutlineAdminPanelSettings,
//   MdOutlineSchool,
// } from "react-icons/md";
// import { TbLockPassword } from "react-icons/tb";
// import {
//   IoEyeOutline,
//   IoEyeOffOutline,
//   IoSchoolOutline,
// } from "react-icons/io5";
// import { FiShield } from "react-icons/fi";
// import { signUpApi } from "../api/api";
// import { AuthContext } from "../context/AuthContext";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { setFirstName, setLastName, setSubject, setTeacherId } =
//     useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     subject: "",
//   });
//   const [error, setError] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     subject: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleRoleSelect = (role) => {
//     setFormData((prev) => ({ ...prev, role, subject: "" }));
//     setError((prev) => ({ ...prev, role: "", subject: "" }));
//   };

//   const validate = () => {
//     let newError = {};
//     if (!formData.firstName.trim())
//       newError.firstName = "First name is required";
//     if (!formData.lastName.trim()) newError.lastName = "Last name is required";
//     const emailCond = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) newError.email = "Email is required";
//     else if (!emailCond.test(formData.email))
//       newError.email = "Invalid email format";
//     const passwordCond = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/;
//     if (!formData.password.trim()) newError.password = "Password is required";
//     else if (!passwordCond.test(formData.password))
//       newError.password = "6–20 chars, upper, lower, number";
//     if (!formData.confirmPassword.trim())
//       newError.confirmPassword = "Confirm your password";
//     else if (formData.password !== formData.confirmPassword)
//       newError.confirmPassword = "Passwords don't match";
//     if (!formData.role) newError.role = "Select a role";
//     if (formData.role === "TEACHER" && !formData.subject)
//       newError.subject = "Select a subject";
//     setError(newError);
//     return Object.keys(newError).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const data = await signUpApi(formData);
//       setFirstName(data.user.firstName);
//       setLastName(data.user.lastName);
//       setSubject(data.user.subject || data.user.Subject || "");
//       setTeacherId(data.user._id);
//       navigate("/dashboard");
//     } catch (err) {
//       const msg = err.response?.data?.message || "Sign up failed";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputBase =
//     "flex items-center border rounded-xl px-3 h-11 bg-slate-50 transition-all";
//   const inputFocus =
//     "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:bg-white";
//   const inputError = "border-red-400 bg-red-50";

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* ── Card Header ── */}
//         <div className=" bg-blue-700 px-8 py-6 relative overflow-hidden">
//           <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-400 opacity-10 blur-2xl" />
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/40 shrink-0">
//               <FiShield size={22} className="text-white" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white">
//                 Early Warning System
//               </h2>
//               <p className="text-slate-400 text-xs mt-0.5">
//                 Student performance monitoring platform
//               </p>
//             </div>
//           </div>
//           {/* accent bar */}
//           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-400" />
//         </div>

//         {/* ── Form Body ── */}
//         <div className="px-8 py-7">
//           <p className="text-sm font-bold uppercase tracking-widest  mb-4">
//             Personal Info
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Names */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm font-semibold  mb-1.5">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Pat"
//                   className={`w-full border rounded-xl px-3 h-11 text-sm bg-slate-50 outline-none transition-all placeholder-slate-300 text-slate-900
//                     ${error.firstName ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"}`}
//                 />
//                 {error.firstName && (
//                   <p className="text-red-500 text-xs mt-1">{error.firstName}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-1.5">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Joe"
//                   className={`w-full border rounded-xl px-3 h-11 text-sm bg-slate-50 outline-none transition-all placeholder-slate-300 text-slate-900
//                     ${error.lastName ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"}`}
//                 />
//                 {error.lastName && (
//                   <p className="text-red-500 text-xs mt-1">{error.lastName}</p>
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                 Email Address
//               </label>
//               <div
//                 className={`${inputBase} ${error.email ? inputError : inputFocus}`}
//               >
//                 <MdOutlineEmail
//                   size={17}
//                   className="text-slate-400 mr-2.5 shrink-0"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="teacher@school.edu"
//                   className="flex-1 text-sm bg-transparent outline-none text-slate-900 placeholder-slate-300"
//                 />
//               </div>
//               {error.email && (
//                 <p className="text-red-500 text-xs mt-1">{error.email}</p>
//               )}
//             </div>

//             {/* Passwords */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                   Password
//                 </label>
//                 <div
//                   className={`${inputBase} ${error.password ? inputError : inputFocus}`}
//                 >
//                   <TbLockPassword
//                     size={17}
//                     className="text-slate-400 mr-2 shrink-0"
//                   />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="flex-1 text-sm bg-transparent outline-none text-slate-900 placeholder-slate-300 min-w-0"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-slate-400 hover:text-slate-600 ml-1 shrink-0"
//                   >
//                     {showPassword ? (
//                       <IoEyeOffOutline size={16} />
//                     ) : (
//                       <IoEyeOutline size={16} />
//                     )}
//                   </button>
//                 </div>
//                 {error.password && (
//                   <p className="text-red-500 text-xs mt-1">{error.password}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                   Confirm Password
//                 </label>
//                 <div
//                   className={`${inputBase} ${error.confirmPassword ? inputError : inputFocus}`}
//                 >
//                   <TbLockPassword
//                     size={17}
//                     className="text-slate-400 mr-2 shrink-0"
//                   />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="flex-1 text-sm bg-transparent outline-none text-slate-900 placeholder-slate-300 min-w-0"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="text-slate-400 hover:text-slate-600 ml-1 shrink-0"
//                   >
//                     {showConfirmPassword ? (
//                       <IoEyeOffOutline size={16} />
//                     ) : (
//                       <IoEyeOutline size={16} />
//                     )}
//                   </button>
//                 </div>
//                 {error.confirmPassword && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {error.confirmPassword}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Role */}
//             <div>
//               <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 mt-1">
//                 Your Role
//               </p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => handleRoleSelect("ADMIN")}
//                   className={`flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all
//                     ${
//                       formData.role === "ADMIN"
//                         ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
//                         : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
//                     }`}
//                 >
//                   <MdOutlineAdminPanelSettings size={18} /> Admin
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleRoleSelect("TEACHER")}
//                   className={`flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all
//                     ${
//                       formData.role === "TEACHER"
//                         ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
//                         : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
//                     }`}
//                 >
//                   <IoSchoolOutline size={18} /> Teacher
//                 </button>
//               </div>
//               {error.role && (
//                 <p className="text-red-500 text-xs mt-1">{error.role}</p>
//               )}
//             </div>

//             {/* Subject */}
//             {formData.role === "TEACHER" && (
//               <div>
//                 <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                   Subject
//                 </label>
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className={`w-full border rounded-xl px-3 h-11 text-sm bg-slate-50 outline-none transition-all text-slate-600
//                     ${error.subject ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"}`}
//                 >
//                   <option value="">Select subject</option>
//                   <option value="Mathematics">Mathematics</option>
//                   <option value="Science">Science</option>
//                   <option value="English">English Language</option>
//                   <option value="Social Studies">Social Studies</option>
//                 </select>
//                 {error.subject && (
//                   <p className="text-red-500 text-xs mt-1">{error.subject}</p>
//                 )}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className=" bg-blue-600 w-full h-12 cursor-pointer hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-sm tracking-wide shadow-lg s disabled:opacity-60 disabled:cursor-not-allowed mt-1"
//             >
//               {loading ? "Creating account..." : "Create My Account"}
//             </button>

//             <p className="text-center text-xs text-slate-500">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

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
      setSubject(data.user.Subject);
      setTeacherId(data.user._id);
      alert("account created");
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
