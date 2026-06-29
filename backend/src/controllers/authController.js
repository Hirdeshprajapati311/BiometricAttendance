import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    const userCount = await User.countDocuments();

    if (userCount > 0) {
      return res.status(403).json({
        success: false,
        message: "Organization already exists. Contact your admin",
      });
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExistInDB = await User.findOne({ email }).select("+password");

    if (!isExistInDB) {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isExistInDB.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * POST api/auth/refresh-token
 */

export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

/**
 * POST api/auth/logout
 */

export async function logout(req, res) {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
}
