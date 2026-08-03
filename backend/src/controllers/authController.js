import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, organizationName } = req.body;

  const userCount = await User.countDocuments();

  if (userCount > 0) {
    throw new ApiError(403, "Organization already exists. Contact your admin");
  }

  const hashPassowrd = await bcrypt.hash(password, 10);

  const userData = {
    email,
    password: hashPassowrd,
    name,
    role: "admin",
    isRootAdmin: true,
    organizationName,
  };

  const user = new User(userData);
  await user.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const isExistInDB = await User.findOne({ email }).select("+password");

    if (!isExistInDB) {
      throw new ApiError(401, "Invalid User");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isExistInDB.password,
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid Credentials");
    }

    const accessToken = jwt.sign(
      { userId: isExistInDB._id, role: isExistInDB.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { userId: isExistInDB._id, role: isExistInDB.role },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfull!",
      accessToken,
      user: {
        _id: isExistInDB._id,
        name: isExistInDB.name,
        email: isExistInDB.email,
        role: isExistInDB.role,
      },
    });
  
})

/**
 * POST api/auth/refresh-token
 */

export const refreshToken= asyncHandler(async function refreshToken(req, res) {
  
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new ApiError(401, "Invalid User");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const newAccessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      message: "User verified",
      user: {
        _id: user.userId,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    });

})

/**
 * POST api/auth/logout
 */

export const logout = asyncHandler(async function logout(req, res) {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
});
