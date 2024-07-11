import { z } from "zod";
import { UserStatus } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .min(3, { message: "Name must be at least 3 chars" })
      .max(30, { message: "Name can not be more than 30 chars." }),
    email: z
      .string({
        invalid_type_error: "Email must be string",
      })
      .email({ message: "Provide a valid email." }),
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .max(20, { message: "Password can not be more than 20 characters" }),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const UserValidation = {
  createUserValidationSchema,
  changeStatusValidationSchema,
};
