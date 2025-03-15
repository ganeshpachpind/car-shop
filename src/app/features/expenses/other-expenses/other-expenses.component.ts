import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ✅ Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; 

interface Expense {
  description: string;
  amount: number;
}

@Component({
  selector: 'app-other-expenses',
  standalone: true,
  templateUrl: './other-expenses.component.html',
  styleUrls: ['./other-expenses.component.scss'],
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
export class OtherExpensesComponent { // ✅ Ensure this is exported
  expenses: Expense[] = [];

  constructor(private router: Router) {}

  addExpense() {
    this.expenses.push({ description: '', amount: 0 });
  }

  removeExpense(index: number) {
    this.expenses.splice(index, 1);
  }

  saveExpenses() {
    console.log('Saved Expenses:', this.expenses);
    alert('Expenses saved successfully!');
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
