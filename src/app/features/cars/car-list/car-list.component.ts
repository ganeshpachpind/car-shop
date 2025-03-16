import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../../../models/car';

// ✅ Import Material Components
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class CarListComponent {
  cars: Car[] = [];
  displayedColumns: string[] = [
    'carNumber',
    'carModel',
    'name',
    'purchasePrice',
    'expenses',  // ✅ Ensure this is here for collapsible expenses
    'sellPrice',
    'profit',
    'actions'
  ];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.carService.cars$.subscribe(data => {
      this.cars = data.map(car => ({
        ...car,
        profit: this.calculateProfit(car)
      }));
    });
  }

  calculateProfit(car: any): number {
    if (!car.sellPrice) return 0; // If the car is not sold, profit is 0
    const totalExpenses = car.workshopExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
    return car.sellPrice - car.purchasePrice - totalExpenses;
  }

  navigateToAddCar() {
    this.router.navigate(['/add-car']);
  }

  navigateToOtherExpenses() {
    this.router.navigate(['/other-expenses']);
  }

  deleteCar(id: string) {
    this.carService.deleteCar(id);
  }
  
  editCar(id: string) {
    this.router.navigate([`/edit-car/${id}`]); // ✅ Navigates to the Edit Car page
  }

}
