import { Product } from './product.model';
import { User } from './user.model';

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
  id?: string;
  user: User;
  items: OrderItem[];
  orderDate: Date;
  address: Address;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  price: Number;
}
