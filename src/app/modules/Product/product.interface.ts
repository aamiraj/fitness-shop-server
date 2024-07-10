export type TProduct = {
  name: string;
  price: number;
  description: string;
  images?: Array<string>;
  category: string;
  stock: number;
  isDeleted: boolean;
};
