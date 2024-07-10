/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { OrderSearchableFields } from "./order.constant";
import mongoose from "mongoose";
import { Product } from "../Product/product.model";

const createOrderIntoDB = async (payload: Partial<TOrder>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    payload?.products?.forEach(async (item) => {
      const id = item.product;
      const quantity = item.quantity;

      await Product.updateOne(
        {
          _id: id,
        },
        {
          $inc: {
            stock: -quantity,
          },
        }
      );
    });

    const newOrder = await Order.create(payload);

    await session.commitTransaction();
    await session.endSession();
    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Order did not created.");
  }
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const modifiedUpdatedData: Record<string, unknown> = payload;

  const result = await Order.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const deletedOrder = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedOrder) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete order.");
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
