import User from "../model/User.model.js";

/**
 *  GET getLeaveBalance
 */

export const getLeaveBalance = async (req, res) => {
  try {
    const { userId } = req.user;

    const { leaveBalance } = await User.findById(userId).select("leaveBalance");

    res.status(200).json({
      success: true,
      leaveBalance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
