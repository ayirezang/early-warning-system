const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

// //signup
const signUp = async (req, res) => {
  //validation checks
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { firstName, lastName, email, password, role, subject } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !role) {
      return res
        .status(400)
        .json({ sucess: false, error: "all fields are required" });
    }
    if (role === "teacher" && !subject) {
      return res
        .status(400)
        .json({ success: false, error: "subject is requred for teachers" });
    }
    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "email already exist" });
    }
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
      role,
      subject: role === "teacher" ? subject : undefined,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.SECRET_KEY || "your-secret-key",
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 24hrs
      })
      .status(201)
      .json({
        message: "user created successfully",
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
        },
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "error creating user",
      error: error.message,
    });
  }
};
//login

const loginIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 24hrs
      })
      .status(200)
      .json({
        message: "sign in successful",
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        },
      });
  } catch (error) {
    console.error("SignIn error:", error);
    res.status(500).json({
      message: "error signing in user",
      error: error.message,
    });
  }
};

// Sign out
const logOut = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "user signed out successfully" });
  } catch (error) {
    console.error("SignOut error:", error);
    res.status(500).json({
      message: "error signing out",
      error: error.message,
    });
  }
};
module.exports = { signUp, loginIn, logOut };
