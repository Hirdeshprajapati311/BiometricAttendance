import userModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/**
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { name }],
    });

    if (isAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashPassowrd = await bcrypt.hash(password, 10);

    const userData = {
      email,
      password: hashPassowrd,
      name,
      role: "admin",
    };

    const user = new userModel(userData);
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

    const isExistInDB = await userModel.findOne({ email }).select("+password");

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

    return res.status(200).json({
      success: true,
      message: "Login Successfull!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
