import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car , WorkshopExpense} from '../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    { id: '1', carNumber: 'ABC123', carModel: 'Toyota Corolla', name: 'Corolla', purchaseDate: '2023-06-10', purchasePrice: 15000, workshopExpenses: [] },
    { id: '2', carNumber: 'XYZ789', carModel: 'Honda Civic', name: 'Civic', purchaseDate: '2022-09-15', purchasePrice: 18000, workshopExpenses: [] },
    { id: '3', carNumber: 'LMN456', carModel: 'Ford Mustang', name: 'Mustang', purchaseDate: '2021-12-05', purchasePrice: 35000, workshopExpenses: [] },
    { id: '4', carNumber: 'JKL012', carModel: 'Tesla Model 3', name: 'Model 3', purchaseDate: '2024-01-20', purchasePrice: 45000, workshopExpenses: [] },
    { id: '5', carNumber: 'PQR678', carModel: 'Chevrolet Camaro', name: 'Camaro', purchaseDate: '2020-05-30', purchasePrice: 32000, workshopExpenses: [] }
  ];

  private carsSubject = new BehaviorSubject<Car[]>(this.cars);
  cars$ = this.carsSubject.asObservable(); // ✅ Ensures data is available

  addCar(car: Car) {
    car.id = Math.random().toString(36).substr(2, 9); // Generate unique ID
    car.profit = this.calculateProfit(car);
    this.cars.push(car);
    this.carsSubject.next(this.cars);
  }

  deleteCar(id: string) {
    this.cars = this.cars.filter(car => car.id !== id);
    this.carsSubject.next(this.cars);
  }

  updateCar(updatedCar: Car) {
    const index = this.cars.findIndex(car => car.id === updatedCar.id);
    if (index !== -1) {
      updatedCar.profit = this.calculateProfit(updatedCar);
      this.cars[index] = updatedCar;
      this.carsSubject.next(this.cars);
    }
  }

  // ✅ Calculate Total Workshop Expenses
  getTotalWorkshopExpenses(expenses: WorkshopExpense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // ✅ Calculate Profit After Expenses
  private calculateProfit(car: Car): number | undefined {
    const totalExpenses = this.getTotalWorkshopExpenses(car.workshopExpenses);
    if (car.sellPrice !== undefined) {
      return car.sellPrice - car.purchasePrice - totalExpenses;
    }
    return undefined; // Profit not applicable if the car isn't sold
  }
}