export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description?: string;
  unitPrice: number;
  mainCategory: string;
  subCategory: string;
  brand: string;
  color: string[];
  size: string[];
  qtyOnHand: number;
  isFeatured?: boolean;
  dateCreated?: Date;
  quantity?: number;
}
