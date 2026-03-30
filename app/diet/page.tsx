'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { MEAL_LABELS, MEAL_ICONS, MealType } from '@/types/diet';
import BarChart from '@/components/BarChart';

function dateStr(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function formatDisplay(dateISO: string) {
  const d = new Date(dateISO + 'T00:00:00');
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
}

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
const CALORIE_GOAL = 2000;

export default function DietPage() {
  const { dietRecords, getDietsByDate } = useStore();
  const [dayOffset, setDayOffset] = useState(0); // 0 = today
  const today = dateStr(0);
  const selectedDate = dateStr(dayOffset);

  // ── Selected day ───────────────────────────────────
  const records     = getDietsByDate(selectedDate);
  const totalCal    = records.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.calories, 0), 0);
  const totalProtein= records.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.protein, 0), 0);
  const totalCarbs  = records.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.carbs, 0), 0);
  const totalFat    = records.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.fat, 0), 0);
  const progress    = Math.min((totalCal / CALORIE_GOAL) * 100, 100);

  // ── 7-day calorie chart ────────────────────────────
  const chartBars = Array.from({ length: 7 }, (_, i) => {
    const offset  = i - 6; // -6 ~ 0
    const dStr    = dateStr(offset);
    const dayRecs = dietRecords.filter((r) => r.date === dStr);
    const cal     = dayRecs.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.calories, 0), 0);
    const d       = new Date(dStr + 'T00:00:00');
    const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      label:     offset === 0 ? '오늘' : dayLabels[d.getDay()],
      value:     cal,
      highlight: dStr === selectedDate,
    };
  });

  return (
    <main className="px-4 pt-10 pb-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">식단</h1>

      {/* 7-day Calorie Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
            <span>📊</span> 최근 7일 섭취 칼로리
          </h2>
          <span className="text-xs text-gray-400">목표 {CALORIE_GOAL.toLocaleString()} kcal</span>
        </div>
        <BarChart
          bars={chartBars}
          unit="kcal"
          goal={CALORIE_GOAL}
          color="bg-emerald-400"
          highlightColor="bg-emerald-600"
        />
      </div>

      {/* Date Navigator */}
      <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm">
        <button
          onClick={() => setDayOffset((o) => o - 1)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800">
            {dayOffset === 0 ? '오늘' : dayOffset === -1 ? '어제' : formatDisplay(selectedDate)}
          </p>
          <p className="text-xs text-gray-400">{selectedDate}</p>
        </div>
        <button
          onClick={() => setDayOffset((o) => Math.min(o + 1, 0))}
          disabled={dayOffset === 0}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calorie Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xs text-gray-400">섭취 칼로리</p>
            <p className="text-3xl font-bold text-emerald-600">{totalCal.toLocaleString()}</p>
          </div>
          <p className="text-sm text-gray-400">/ {CALORIE_GOAL.toLocaleString()} kcal</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-4">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-red-400' : 'bg-emerald-500'}`}
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
      <div className="space-y-3">
        {MEAL_ORDER.map((mealType) => {
          const mealRecs = records.filter((r) => r.mealType === mealType);
          const mealCal  = mealRecs.reduce((s, r) => s + r.foods.reduce((a, f) => a + f.calories, 0), 0);
          return (
            <div key={mealType} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span>{MEAL_ICONS[mealType]}</span>
                  <span className="font-medium text-sm text-gray-700">{MEAL_LABELS[mealType]}</span>
                </div>
                <span className="text-xs text-gray-400">{mealCal > 0 ? `${mealCal} kcal` : '—'}</span>
              </div>
              {mealRecs.length > 0 ? (
                <div className="px-4 py-2 space-y-1">
                  {mealRecs.map((record) =>
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

      {/* Add Button (today only) */}
      {selectedDate === today && (
        <Link href="/diet/add">
          <button className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-2xl hover:bg-emerald-600 transition-colors">
            + 식단 추가
          </button>
        </Link>
      )}
    </main>
  );
}
