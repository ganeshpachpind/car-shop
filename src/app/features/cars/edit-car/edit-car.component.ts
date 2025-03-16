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
    });
  }

  addExpense() {
    this.car.workshopExpenses.push({ description: '', amount: 0 });
  }

  removeExpense(index: number) {
    this.car.workshopExpenses.splice(index, 1);
  }

  saveCar() {
    this.carService.updateCar(this.car);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}