import { IProduct } from "../ProductModel";

export interface IOrder {
  orderId: string;
  cartItems: IProduct[];
  shippingDetails: any;
  billingDetails: any;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: string;
}
