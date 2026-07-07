import cron from "node-cron";
import Leave from "./models/Leave.model.js";

cron.schedule("0 0 * * *", async () => {
  await Leave.updateMany(
    {
      status: "pending",
      startDate: { $lt: new Date() },
    },
    {
      $set: {
        status: "expired",
      },
    },
  );

  console.log("Expired leave requests updated");
});
