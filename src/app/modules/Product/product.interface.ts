import { Model } from "mongoose";

export type TProduct = {
  name: string;
  price: number;
  description: string;
  images?: Array<string>;
  category: string;
  stock: number;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(id: string): Promise<TProduct | null>;
}
