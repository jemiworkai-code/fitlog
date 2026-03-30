'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { MEAL_LABELS, MEAL_ICONS, MealType } from '@/types/diet';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function DietPage() {
  const { getDietsByDate } = useStore();
  const today = todayStr();
  const records = getDietsByDate(today);

  const totalCalories = records.reduce(
    (sum, r) => sum + r.foods.reduce((s, f) => s + f.calories, 0),
    0
  );
  const totalProtein = records.reduce(
    (sum, r) => sum + r.foods.reduce((s, f) => s + f.protein, 0),
    0
  );
  const totalCarbs = records.reduce(
    (sum, r) => sum + r.foods.reduce((s, f) => s + f.carbs, 0),
    0
  );
  const totalFat = records.reduce(
    (sum, r) => sum + r.foods.reduce((s, f) => s + f.fat, 0),
    0
  );

  const goal = 2000;
  const progress = Math.min((totalCalories / goal) * 100, 100);

  const mealOrder: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <main className="px-4 pt-12 pb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">오늘의 식단</h1>
        <span className="text-sm text-gray-400">{today}</span>
      </div>

      {/* Calorie Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xs text-gray-400">오늘 섭취 칼로리</p>
            <p className="text-3xl font-bold text-indigo-600">{totalCalories.toLocaleString()}</p>
          </div>
          <p className="text-sm text-gray-400">목표 {goal.toLocaleString()} kcal</p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-4">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              progress >= 100 ? 'bg-red-400' : 'bg-indigo-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: '단백질', value: totalProtein, unit: 'g', color: 'text-blue-500' },
            { label: '탄수화물', value: totalCarbs, unit: 'g', color: 'text-yellow-500' },
            { label: '지방', value: totalFat, unit: 'g', color: 'text-rose-400' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="bg-gray-50 rounded-xl py-2">
              <p className={`font-semibold text-sm ${color}`}>{value}{unit}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meal List */}
      <div className="space-y-3 mb-6">
        {mealOrder.map((mealType) => {
          const mealRecords = records.filter((r) => r.mealType === mealType);
          const mealCal = mealRecords.reduce(
            (sum, r) => sum + r.foods.reduce((s, f) => s + f.calories, 0),
            0
          );

          return (
            <div key={mealType} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span>{MEAL_ICONS[mealType]}</span>
                  <span className="font-medium text-sm text-gray-700">{MEAL_LABELS[mealType]}</span>
                </div>
                <span className="text-xs text-gray-400">{mealCal > 0 ? `${mealCal} kcal` : '—'}</span>
              </div>

              {mealRecords.length > 0 ? (
                <div className="px-4 py-2 space-y-1">
                  {mealRecords.map((record) =>
                    record.foods.map((food, i) => (
                      <div key={i} className="flex justify-between text-sm py-0.5">
                        <span className="text-gray-700">{food.name} <span className="text-gray-400 text-xs">{food.amount}</span></span>
                        <span className="text-gray-500">{food.calories} kcal</span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="px-4 py-3 text-xs text-gray-300">기록 없음</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Button */}
      <Link href="/diet/add">
        <button className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-colors">
          + 식단 추가
        </button>
      </Link>
    </main>
  );
}
