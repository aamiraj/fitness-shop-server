/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Admin } from "../Admin/admin.model";
import { Customer } from "../Customer/customer.model";
import mongoose from "mongoose";

const createCustomerIntoDB = async (payload: {
  fullName: string;
  email: string;
  password: string;
}) => {
  // create a customer object
  const customerData: Partial<TUser> = {
    fullName: payload?.fullName,
    email: payload?.email,
    password: payload?.password,
    role: "customer",
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a customer
    const newUser = await User.create([customerData], { session });

    const newCustomer = await Customer.create(
      [{ user: newUser[0]?._id, fullName: payload?.fullName }],
      { session }
    );

    if (!newCustomer[0]?._id) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create customer.");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Customer did not created.");
  }
};

const createAdminIntoDB = async (payload: {
  fullName: string;
  email: string;
  password: string;
}) => {
  // create a admin object
  const AdminData: Partial<TUser> = {
    fullName: payload?.fullName,
    email: payload?.email,
    password: payload?.password,
    role: "admin",
  };

  // create a Admin
  const newAdmin = await User.create(AdminData); // array

  if (!newAdmin?._id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Admin.");
  }

  return newAdmin;
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === "customer") {
    result = await Customer.findOne({ user: userId }).populate("user");
  }
  if (role === "admin") {
    result = await Admin.findOne({ user: userId }).populate("user");
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createCustomerIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
