import { z } from "zod";
import { UserStatus } from "./user.constant";

const createUserValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be string",
  }),
  email: z.string({
    invalid_type_error: "Email must be string",
  }),
  pasword: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "Password can not be more than 20 characters" }),
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
