/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { ProductSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: Partial<TProduct>) => {
  const newProduct = await Product.create(payload);

  return newProduct;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filterbyCategory()
    .queryPriceRange()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const modifiedUpdatedData: Record<string, unknown> = payload;

  const result = await Product.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete product.");
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
