import User from "../model/User.model.js";
import bycrpt from "bcrypt";

/**
 *  POST api/auth/create
 */

export const createUser = async (req, res) => {
  try {
    console.log("req.body:", req.body); // add this
    const { name, phone, email, password, role, department, designation } =
      req.body;
    console.log("after destructuring, checking existing user...");

    const existUser = await User.findOne({
      email,
    });
    console.log("existingUser:", existUser);

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bycrpt.hash(password, 10);

    const userCount = await User.countDocuments();
    const empId = `EMP-${String(userCount).padStart(3, "0")}`;

    const user = new User({
      name,
      email,
      phone,
      password: hashPassword,
      role,
      department,
      designation,
      empId: role === "employee" ? empId : undefined,
      leaveBalance:
        role === "employee"
          ? {
              casual: { total: 7, used: 0 },
              sick: { total: 7, used: 0 },
              earned: { total: 7, used: 0 },
              adjustment: { total: 7, used: 0 },
              unpaid: { total: 7, used: 0 },
              half: { total: 7, used: 0 },
            }
          : undefined,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: `${role} created successfully`,
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.find({ isRootAdmin: false }).select(
      "name avatar designation department role",
    );
    return res.status(200).json({
      success: "true",
      users,
    });
  } catch {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
