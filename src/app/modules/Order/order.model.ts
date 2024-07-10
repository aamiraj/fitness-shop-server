import mongoose, { Schema, model } from "mongoose";
import { TOrderedProducts, TOrder } from "./order.interface";

const orderedProductsSchema = new Schema<TOrderedProducts>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    products: [
      {
        type: orderedProductsSchema,
        required: [true, "Products are required"],
      },
    ],
    productsTotalPrice: { type: Number },
    shippingCost: { type: Number },
    couponDiscount: { type: Number },
    paymentMethod: { type: String },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<TOrder>("Order", orderSchema);
