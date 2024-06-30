import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  county: string;
  postcode: string;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  orderDate: Date;
  address: Address;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
