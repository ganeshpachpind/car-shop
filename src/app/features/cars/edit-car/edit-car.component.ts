import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../../../models/car';

// ✅ Import Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
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
export class EditCarComponent {
  car!: Car;

  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    this.carService.cars$.subscribe(cars => {
      this.car = cars.find(c => c.id === carId) || {} as Car;

      if (!this.car.workshopExpenses) {
        this.car.workshopExpenses = []; // ✅ Ensure expenses array is initialized
      }

      if (!this.car.payments) {
        this.car.payments = []; // ✅ Ensure payments array is initialized
      }
    });
  }

  // ✅ Add Workshop Expense
  addExpense() {
    this.car.workshopExpenses.push({ description: '', amount: 0 });
  }

  removeExpense(index: number) {
    this.car.workshopExpenses.splice(index, 1);
  }

  // ✅ Add Payment (Ensures total payments do not exceed purchasePrice)
  addPayment() {
    if (this.getTotalPayments() >= this.car.purchasePrice) return;
    this.car.payments.push({ amount: 0, date: '' });
  }

  removePayment(index: number) {
    this.car.payments.splice(index, 1);
  }

  // ✅ Get Total Payments Sum
  getTotalPayments(): number {
    return this.car.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  }

  saveCar() {
    if (this.getTotalPayments() > this.car.purchasePrice) {
      alert("⚠️ Payments exceed the purchase price! Please adjust the payments.");
      return;
    }
    this.carService.updateCar(this.car);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
