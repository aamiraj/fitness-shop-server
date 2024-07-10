/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Admin } from "../Admin/admin.model";
import { Customer } from "../Customer/customer.model";

const createCustomerIntoDB = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  // create a customer object
  const customerData: Partial<TUser> = {
    name: payload?.name,
    email: payload?.email,
    password: payload?.password,
    role: "customer",
  };

  // create a customer
  const newCustomer = await User.create(customerData);

  if (!newCustomer?._id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create customer.");
  }

  return newCustomer;
};

const createAdminIntoDB = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  // create a admin object
  const AdminData: Partial<TUser> = {
    name: payload?.name,
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
    result = await Customer.findOne({ id: userId }).populate("user");
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
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
