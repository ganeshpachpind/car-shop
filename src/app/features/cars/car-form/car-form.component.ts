import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car, WorkshopExpense } from '../../../models/car';

// ✅ Import Material UI Components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-car-form',
  standalone: true,
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule
  ]
})
export class CarFormComponent {
  car: Car = {
    carNumber: '',
    carModel: '',
    name: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchasePrice: 0,
    payments:[],
    workshopExpenses: [], // ✅ Ensure expenses are initialized
  };

  constructor(private carService: CarService, private router: Router) {}

  addExpense() {
    this.car.workshopExpenses.push({ description: '', amount: 0 , editing:false});
  }

  removeExpense(index: number) {
    this.car.workshopExpenses.splice(index, 1);
  }

  addCar() {
    if (!this.car.carNumber || !this.car.carModel || !this.car.name || !this.car.purchasePrice) return;

    this.carService.addCar({ ...this.car });
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
