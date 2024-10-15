import { z } from "zod";

// create schemas
const createCustomerInfoValidationSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  shippingAddress: z.string(),
});

const createOrderedProductsValidationSchema = z
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
    customerInfo: createCustomerInfoValidationSchema,
    products: createOrderedProductsValidationSchema,
    productsTotalPrice: z.number(),
    shippingCost: z.number(),
    couponDiscount: z.number(),
    grandTotal: z.number(),
    paymentMethod: z.string(),
  }),
});

// update schemas
const updateCustomerInfoValidationSchema = z
  .object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    shippingAddress: z.string().optional(),
  })
  .optional();

const updateOrderedProductsValidationSchema = z
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
    customerInfo: updateCustomerInfoValidationSchema,
    products: updateOrderedProductsValidationSchema,
    productsTotalPrice: z.number().optional(),
    shippingCost: z.number().optional(),
    couponDiscount: z.number().optional(),
    grandTotal: z.number().optional(),
    paymentMethod: z.string().optional(),
    isPaid: z.boolean().optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
