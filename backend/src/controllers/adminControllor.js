import User from "../model/User.model.js";
import bycrpt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 *  POST api/auth/create
 */

export const createUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password, role, department, designation } =
    req.body;
  console.log("after destructuring, checking existing user...");

  const existUser = await User.findOne({
    email,
  });
  console.log("existingUser:", existUser);

  if (existUser) {
    throw new ApiError(400, "Email already exists");
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
});

export const getAll = asyncHandler(async (req, res) => {
  const users = await User.find({ isRootAdmin: false }).select(
    "name avatar designation department role email phone",
  );
  return res.status(200).json({
    success: "true",
    users,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updateEmployee = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});
