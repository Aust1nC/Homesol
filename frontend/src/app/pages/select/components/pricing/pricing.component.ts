import { Component } from '@angular/core';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  subDuration = 12;
  isSelected = false;
  selectedKit = '';

  kitItems: Array<Product> = [
    {
      id: '1',
      name: 'Vacuum cleaner',
      price: 5,
      category: 'Technology',
    },
    {
      id: '2',
      name: 'Electric kettle',
      price: 5,
      category: 'Technology',
    },
    {
      id: '3',
      name: 'Rice cooker',
      price: 5,
      category: 'Technology',
    },
    {
      id: '4',
      name: 'Hair dryer',
      price: 5,
      category: 'Technology',
    },
    {
      id: '5',
      name: 'Desk lamp',
      price: 5,
      category: 'Technology',
    },
  ];

  onDuration(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.subDuration = parseInt(inputElement.value, 10);
  }

  onSelectKit(kit: string): void {
    this.isSelected = !this.isSelected;
    this.selectedKit = kit;
  }
}
