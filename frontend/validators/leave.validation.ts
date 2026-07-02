import { z } from "zod";

export const createLeaveSchema = z.object({
  type: z.string().min(1, "Please select a leave type"),
  startDate: z.string().min(1, "Please select a start date"),
  endDate: z.string().min(1, "Please select an end date"),
  reason: z.string().min(1, "Please enter a reason for leave"),
});

export type CreateLeaveData = z.infer<typeof createLeaveSchema>;
