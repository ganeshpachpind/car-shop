import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// ✅ Import Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { Car } from '../../../models/car';

@Component({
  selector: 'app-car-row',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, MatCardModule],
  templateUrl: './car-row.component.html',
  styleUrls: ['./car-row.component.scss']
})
export class CarRowComponent {
  @Input() car!: Car;

  constructor(private router: Router) {}

  editCar() {
    this.router.navigate([`/edit-car/${this.car.id}`]);
  }

  deleteCar() {
    // Logic to delete the car (this should be handled in parent component)
  }

  getProfit(): number {
    if (!this.car.sellPrice) return 0; // If not sold, profit is 0
    const totalExpenses = this.car.workshopExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return this.car.sellPrice - this.car.purchasePrice - totalExpenses;
  }
}
