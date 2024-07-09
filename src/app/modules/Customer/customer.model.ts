import { Schema, model } from "mongoose";
import { Gender } from "./customer.constant";
import { CustomerModel, TCustomer } from "./customer.interface";

const customerSchema = new Schema<TCustomer, CustomerModel>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: Gender,
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: Date },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  shippingAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  billingAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  profileImg: { type: String, default: "" },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// filter out deleted documents
customerSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
customerSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Customer.findOne({ id });
  return existingUser;
};

export const Customer = model<TCustomer, CustomerModel>(
  "Customer",
  customerSchema
);
