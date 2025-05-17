import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signup = async (request, response) => {
  const { email, password, fullName } = request.body;

  try {
    if (!email || !password || !fullName) {
      return response.status(400).json({ message: "fileds are required" });
    }

    if (password.length < 6) {
      return response
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "User exist" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvater = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvater,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream created id: ${newUser.fullName}`);
    } catch (error) {
      console.log("error in stream part");
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    response.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attack
      sameSite: "strict", //prevent csrf
      secure: process.env.NODE_ENV === "production",
    });

    response.status(201).json({ srccess: true, user: newUser });
  } catch (error) {
    console.log("error is", error);

    return response.status(500).json({ message: "internal server error" });
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    if (!email && !password) {
      return response.status(400).json({ message: "All fileds are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid Email or Password" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return response
        .status(401)
        .json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    response.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attack
      sameSite: "strict", //prevent csrf
      secure: process.env.NODE_ENV === "production",
    });

    response.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    response.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (request, response) => {
  response.clearCookie("jwt");
  response.status(200).json({ sucess: true, message: "Logout succesfully" });
};

export { signup, login, logout };
