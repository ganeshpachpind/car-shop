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
    'purchaseDate',
    'purchasePrice',
    'expenses',  // ✅ Ensure this is here for collapsible expenses
    'actions'
  ];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.carService.cars$.subscribe(data => {
      this.cars = data;
      console.log("Loaded Cars:", this.cars); // ✅ Debugging Step
    });
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
