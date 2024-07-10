import { Types } from "mongoose";

export type TCustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
};

export type TOrderedProducts = {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type TOrder = {
  user: Types.ObjectId;
  customerInfo: TCustomerInfo;
  products: Array<TOrderedProducts>;
  productsTotalPrice: number;
  shippingCost: number;
  couponDiscount: number;
  grandTotal: number;
  paymentMethod: string;
  isPaid: boolean;
  isDeleted: boolean;
};
