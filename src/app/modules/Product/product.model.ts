import { Schema, model } from "mongoose";
import { ProductModel, TProduct } from "./product.interface";

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, "Name id is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  images: [{ type: String }],
  category: { type: String, required: [true, "Category is required"] },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//checking if product is already exists!
productSchema.statics.isProductExists = async function (id: string) {
  const existingProduct = await Product.findOne({ id });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);
