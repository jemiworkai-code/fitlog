export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식',
};

export const MEAL_ICONS: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍪',
};

export interface FoodEntry {
  name: string;
  calories: number;
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  amount: string;   // 예: "1인분", "200g"
}

export interface DietRecord {
  id: string;
  date: string;       // YYYY-MM-DD
  mealType: MealType;
  foods: FoodEntry[];
  photoUrl: string | null;
  note: string;
}
