import { Model, Types } from "mongoose";

export type TGender = "male" | "female" | "other";

export type TAddress = {
  address: string;
  upazilla: string;
  zilla: string;
  division: string;
};

export type TCustomer = {
  user: Types.ObjectId;
  fullName: string;
  gender: TGender;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo?: string;
  shippingAddress: string;
  billingAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface CustomerModel extends Model<TCustomer> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TCustomer | null>;
}
