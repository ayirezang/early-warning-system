import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
const SignUp = () => {
  const [role, setRole] = useState("");
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <h2 className="text-center">Create Account</h2>
      </header>
      {/**main content */}
      <main className="flex flex-1 items-cemter justify-center p-4 md:p-6">
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
          <form className="space-y-4">
            {/**first & last nae */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm block mb-1">First name</label>
                <input
                  type="text"
                  placeholder="Pat"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-300 "
                ></input>
              </div>
              {/**last nmae */}
              <div className="flex-1">
                <label className="text-sm block mb-1">Last name</label>
                <input
                  type="text"
                  placeholder="Joe"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-300 "
                ></input>
              </div>
            </div>
            {/**email */}
            <div>
              <label className="text-sm block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:boder-blue-300 ">
                <MdOutlineEmail />
                <input
                  type="email"
                  placeholder="pat@gmail.com "
                  className="focus:outline-none   flex-1"
                ></input>
              </div>
            </div>
            {/**password */}
            <div>
              <label className="text-sm block mb-1">Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-lg px-4 py-2 ">
                <TbLockPassword />
                <input
                  type="password"
                  placeholder="*******"
                  className="flex-1 "
                ></input>
                <IoEyeOutline />
              </div>
            </div>
            {/**confirm */}
            <div>
              <label className="text-sm block mb-1"> Confirm Password</label>
              <div className="flex gap-2 items-center  border border-gray-400 rounded-lg px-4 py-2 ">
                <TbLockPassword />
                <input
                  type="password"
                  placeholder="*******"
                  className="flex-1 "
                ></input>
                <IoEyeOutline />
              </div>
            </div>
            {/**role */}
            <div className="flex gap-4 ">
              <div className="flex-1">
                <label className="text-sm block mb-1">Your Role</label>
                <div className="flex gap-4">
                  {/* Admin Button */}
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-lg px-4 py-2 
            ${
              role === "admin"
                ? "bg-blue-600 text-white border-blue-600" // selected style
                : "border-gray-400 text-gray-600" // unselected style
            }`}
                  >
                    <MdOutlineAdminPanelSettings />
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("teacher")}
                    className={`flex-1 flex gap-2 items-center justify-center border rounded-lg px-4 py-2 
            ${
              role === "teacher"
                ? "bg-blue-600 text-white border-blue-600" // selected style
                : "border-gray-400 text-gray-600" // unselected style
            }`}
                  >
                    <IoSchoolOutline />
                    Teacher
                  </button>
                </div>
              </div>
            </div>
            {/**subject role */}
            {role === "teacher" && (
              <div>
                <label className="text-sm block mb-1 ">Subject</label>
                <select className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:border-blue-300 text-gray-500">
                  <option value="">select subject</option>
                  <option value="maths">Mathematics</option>
                  <option value="science">Integrated Science</option>
                  <option value="english">English Language</option>
                  <option value="social studies">Social Studies</option>
                </select>
              </div>
            )}
            {/**create my account button */}
            <button className="w-full rounded-lg px-4 py-2 bg-blue-600 text-white cursor-pointer">
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
