import { z } from "zod";

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(100),
    price: z.number().nonnegative(),
    description: z.string().optional(),
    images: z.string().array(),
    category: z.string(),
    stock: z.number().nonnegative(),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(100).optional(),
    price: z.number().nonnegative().optional(),
    description: z.string().min(10).max(1000).optional(),
    images: z.string().array().optional(),
    category: z.string().min(3).max(20).optional(),
    stock: z.number().nonnegative().optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
