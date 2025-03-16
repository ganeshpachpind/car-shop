export interface WorkshopExpense {
    description: string;
    amount: number;
  }

  export interface Car {
    id?: string;
    carNumber: string;
    carModel: string; 
    name: string;
    purchaseDate: string;
    purchasePrice: number;
    sellDate?: string;
    sellPrice?: number;
    workshopExpenses: { description: string; amount: number; editing:boolean }[];
    profit?: number;
    payments: { amount: number; date: string ; editing:boolean }[];  // ✅ Ensures payments exist
}