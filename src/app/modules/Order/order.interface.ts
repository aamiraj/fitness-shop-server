import { Types } from "mongoose";

export type TOrderedProducts = {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type TOrder = {
  user: Types.ObjectId;
  products: Array<TOrderedProducts>;
  productsTotalPrice: number;
  shippingCost: number;
  couponDiscount: number;
  paymentMethod: string;
  isPaid: boolean;
  isDeleted: boolean;
};
