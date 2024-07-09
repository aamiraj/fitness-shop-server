import { z } from "zod";

export const createOrderedProductsValidationSchema = z
  .object({
    product: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    totalPrice: z.number(),
  })
  .array();

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    products: createOrderedProductsValidationSchema,
    productsTotalPrice: z.number(),
    shippingCost: z.number(),
    couponDiscount: z.number(),
    paymentMethod: z.string(),
    isPaid: z.boolean(),
    isDeleted: z.boolean(),
  }),
});

export const updateOrderedProductsValidationSchema = z
  .object({
    product: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    totalPrice: z.number().optional(),
  })
  .array();

export const updateOrderValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    products: createOrderedProductsValidationSchema,
    productsTotalPrice: z.number().optional(),
    shippingCost: z.number().optional(),
    couponDiscount: z.number().optional(),
    paymentMethod: z.string().optional(),
    isPaid: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
