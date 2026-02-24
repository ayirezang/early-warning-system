import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-2 md:p-4 lg:p-4 border-b border-gray-300">
        <h2 className="text-center">Create Account</h2>
      </header>
      {/**main content */}
      <main className="flex flex-1 items-cemter justify-center p-4 md:p-6">
        {/** */}
        <div className="w-full max-w-lg p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6 ">
            {/**icon and headings */}
            <div className="p-3  rounded-xl ">
              <MdOutlineSchool size={32} />
            </div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-center mt-1">
              Early warning system Login
            </p>
          </div>

          {/**form  */}
          <form className="space-y-6">
            {/** email*/}
            <div className="space-y-4">
              <label className="text-sm block mb-1">Email</label>
              <div className="flex gap-2 items-center border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:boder-blue-300 ">
                <MdOutlineEmail />
                <input
                  type="email"
                  placeholder="pat@gmail.com "
                  className="focus:outline-none   flex-1 "
                ></input>
              </div>
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
            </div>
            <button className=" w-full px-4 py-2 border border-gray-400 rounded-lg bg-blue-600 text-white cursor-pointer">
              Login to Dashboard
            </button>
            <p className="text-center cursor-pointer">
              Dont have an account yet?{" "}
              <span className="text-blue-300 cursor-pointer">
                <Link to="/dashboard"> Signup</Link>
              </span>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
