import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
      required: true,
    },

    isRootAdmin: { type: Boolean, default: false },
    empId: { type: String, unique: true, sparse: true },
    orgianzationName: { type: String, required: true },
    designation: { type: String },
    department: { type: String },
    avatar: { type: String, default: null },
    leaveBalance: {
      casual: { total: Number, used: Number },
      sick: { total: Number, used: Number },
      earned: { total: Number, used: Number },
      adjustment: { total: Number, used: Number },
      unpaid: { total: Number, used: Number },
      half: { total: Number, used: Number },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);
export default User;
