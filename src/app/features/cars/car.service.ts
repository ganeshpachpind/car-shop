import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car , WorkshopExpense} from '../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    {
      id: '1',
      carNumber: 'MH12AB1234',
      carModel: 'Toyota Corolla',
      name: 'Corolla',
      purchaseDate: '2024-03-10',
      purchasePrice: 15000,
      sellDate: '2024-05-20',
      sellPrice: 18000,
      workshopExpenses: [
        { description: 'Oil Change', amount: 100 },
        { description: 'Brake Pad Replacement', amount: 250 }
      ],
      profit: 2900, // Example profit calculation
      payments: [
        { amount: 5000, date: '2024-03-12' },
        { amount: 4000, date: '2024-03-15' },
        { amount: 6000, date: '2024-03-18' } // Total Paid: 15,000 (Full Purchase Price Paid)
      ]
    },
    {
      id: '2',
      carNumber: 'DL5CA5678',
      carModel: 'Honda Civic',
      name: 'Civic',
      purchaseDate: '2024-04-01',
      purchasePrice: 20000,
      sellDate: undefined, // Not sold yet
      sellPrice: undefined,
      workshopExpenses: [
        { description: 'Tire Replacement', amount: 300 }
      ],
      profit: undefined, // Not sold yet, so no profit
      payments: [
        { amount: 7000, date: '2024-04-05' },
        { amount: 5000, date: '2024-04-10' } // Total Paid: 12,000 (Still Needs 8,000)
      ]
    }
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