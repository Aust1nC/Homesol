import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  orderDate: Date;
  address: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
