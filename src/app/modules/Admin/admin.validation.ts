import { z } from "zod";
import { Gender } from "./admin.constant";

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string().optional(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string().optional(),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20).optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
