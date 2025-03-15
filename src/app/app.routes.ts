import { Routes } from '@angular/router';
import { CarListComponent } from './features/cars/car-list/car-list.component';
import { CarFormComponent } from './features/cars/car-form/car-form.component';
import { OtherExpensesComponent } from './features/expenses/other-expenses/other-expenses.component';

export const routes: Routes = [
  { path: '', component: CarListComponent },  
  { path: 'add-car', component: CarFormComponent },  
  { path: 'other-expenses', component: OtherExpensesComponent } 
];