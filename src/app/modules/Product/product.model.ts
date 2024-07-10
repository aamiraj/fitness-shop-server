import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: [
      {
        type: String,
        required: [true, "Images are required"],
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
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

export const Product = model<TProduct>("Product", productSchema);
