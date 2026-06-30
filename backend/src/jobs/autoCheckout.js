import cron from "node-cron";
import Attendance from "../model/Attendance.model.js";

import calculateWorkHours from "../utils/calculateWorkHours.js";

const SCHEDULED_HOUR = 17;
const SCHEDULED_MINUTE = 45;

const runAutoCheckout = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const now = new Date();

    const pending = await Attendance.find({
      date: today,
      checkIn: { $ne: null },
      checkOut: null,
    });

    if (pending.length === 0) {
      console.log("[AutoCheckout] No pending checkouts.");
      return;
    }

    for (const record of pending) {
      record.checkOut = now;
      record.workHours = calculateWorkHours(record.checkIn, now);
      await record.save();
    }

    console.log(`[AutoCheckout] Checked out ${pending.length} record(s).`);
  } catch (error) {
    console.error("[AutoCheckout] Job failed:", error.message);
  }
};

export const startAutoCheckoutJob = () => {
  cron.schedule("45 17 * * *", runAutoCheckout, { timezone: "Asia/Kolkata" });
  console.log("[AutoCheckout] Job scheduled for 5:45 PM daily.");
};

export const catchUpAutoCheckoutIfMissed = async () => {
  const now = new Date();
  const scheduledToday = new Date(now);
  scheduledToday.setHours(SCHEDULED_HOUR, SCHEDULED_MINUTE, 0, 0);

  if (now < scheduledToday) {
    console.log(
      "[AutoCheckout] Scheduled time hasn't arrived yet today, skipping catch-up.",
    );
    return;
  }
  console.log(
    "[AutoCheckout] Past scheduled time on startup — checking for missed run...",
  );
  await runAutoCheckout();
};
