import { Schema, model } from "mongoose";
import { Gender } from "./customer.constant";
import { CustomerModel, TCustomer } from "./customer.interface";

const customerSchema = new Schema<TCustomer, CustomerModel>(
  {
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
    },
    dateOfBirth: { type: Date },
    contactNo: { type: String },
    emergencyContactNo: {
      type: String,
    },
    shippingAddress: {
      type: String,
    },
    billingAddress: {
      type: String,
    },
    profileImg: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//checking if user is already exist!
customerSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Customer.findOne({ id });
  return existingUser;
};

export const Customer = model<TCustomer, CustomerModel>(
  "Customer",
  customerSchema
);
