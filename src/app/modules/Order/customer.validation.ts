import { z } from "zod";
import { Gender } from "./customer.constant";

export const createCustomerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string().optional(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    shippingAddress: z.string(),
    billingAddress: z.string(),
    profileImg: z.string().optional(),
  }),
});

export const updateCustomerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20).optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    shippingAddress: z.string().optional(),
    billingAddress: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const CustomerValidations = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
};
