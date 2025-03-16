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
import { MatTabsModule } from '@angular/material/tabs';

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
    MatIconModule,
    MatTabsModule
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
        this.car.workshopExpenses = [];
      }

      if (!this.car.payments) {
        this.car.payments = [];
      }
    });
  }

  // ✅ Expense Handling
  addExpense() {
    this.car.workshopExpenses.push({ description: '', amount: 0, editing: true });
  }

  editExpense(index: number) {
    this.car.workshopExpenses[index].editing = true;
  }

  saveExpense(index: number) {
    this.car.workshopExpenses[index].editing = false;
  }

  cancelEditExpense(index: number) {
    this.car.workshopExpenses[index].editing = false;
  }

  removeExpense(index: number) {
    this.car.workshopExpenses.splice(index, 1);
  }

  // ✅ Payment Handling
  addPayment() {
    this.car.payments.push({ amount: 0, date: '', editing: true });
  }

  editPayment(index: number) {
    this.car.payments[index].editing = true;
  }

  savePayment(index: number) {
    this.car.payments[index].editing = false;
  }

  cancelEditPayment(index: number) {
    this.car.payments[index].editing = false;
  }

  removePayment(index: number) {
    this.car.payments.splice(index, 1);
  }

  // ✅ Calculate Total Payments
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