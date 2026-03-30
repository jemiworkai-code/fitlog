'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore, UserGoals } from '@/lib/store';
import { EXERCISE_LABELS } from '@/types/workout';
import { MEAL_ICONS } from '@/types/diet';

// ─── Calendar ──────────────────────────────────────────────────────────────

function getCalendarCells(year: number, month: number) {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function pad2(n: number) { return String(n).padStart(2, '0'); }

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

function Calendar() {
  const { records, dietRecords, getWorkoutsByDate, getDietsByDate } = useStore();
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected]   = useState<string>(today.toISOString().slice(0, 10));

  // Build a set of dates that have workout or diet records
  const workoutDates = new Set(records.map((r) => r.uploadedAt.slice(0, 10)));
  const dietDates    = new Set(dietRecords.map((r) => r.date));

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const cells = getCalendarCells(viewYear, viewMonth);
  const todayStr = today.toISOString().slice(0, 10);

  // Selected day records
  const dayWorkouts = getWorkoutsByDate(selected);
  const dayDiets    = getDietsByDate(selected);

  return (
    <section>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-semibold text-gray-800 text-sm">
          {viewYear}년 {viewMonth + 1}월
        </h2>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day of week header */}
      <div className="grid grid-cols-7 mb-1">
        {DOW.map((d, i) => (
          <div key={d} className={`text-center text-xs font-medium py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          const dateStr = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`;
          const isToday    = dateStr === todayStr;
          const isSelected = dateStr === selected;
          const hasWorkout = workoutDates.has(dateStr);
          const hasDiet    = dietDates.has(dateStr);
          const dowIdx = (idx) % 7;

          return (
            <button
              key={dateStr}
              onClick={() => setSelected(dateStr)}
              className={`flex flex-col items-center py-1 rounded-xl transition-colors ${
                isSelected ? 'bg-indigo-600' : isToday ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`text-sm font-medium ${
                isSelected ? 'text-white' :
                isToday    ? 'text-indigo-600' :
                dowIdx === 0 ? 'text-red-400' :
                dowIdx === 6 ? 'text-blue-400' :
                'text-gray-700'
              }`}>
                {day}
              </span>
              {/* Dot indicators */}
              <div className="flex gap-0.5 mt-0.5 h-1.5">
                {hasWorkout && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-200' : 'bg-indigo-400'}`} />
                )}
                {hasDiet && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-green-200' : 'bg-green-400'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-2 justify-end">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400" /><span className="text-[10px] text-gray-400">운동</span></div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /><span className="text-[10px] text-gray-400">식단</span></div>
      </div>

      {/* Selected day detail */}
      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500">
          {selected === todayStr ? '오늘' : selected} 기록
        </p>

        {dayWorkouts.length === 0 && dayDiets.length === 0 && (
          <p className="text-xs text-gray-300 py-2 text-center">기록 없음</p>
        )}

        {dayWorkouts.map((w) => (
          <Link key={w.id} href={`/records/${w.id}`}>
            <div className="flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2 hover:bg-indigo-100 transition-colors">
              <span className="text-base">🏋️</span>
              <div>
                <p className="text-xs font-semibold text-indigo-700">{EXERCISE_LABELS[w.exerciseType]}</p>
                {w.memo && <p className="text-[11px] text-gray-400 truncate max-w-[200px]">{w.memo}</p>}
              </div>
            </div>
          </Link>
        ))}

        {dayDiets.map((d) => {
          const cal = d.foods.reduce((s, f) => s + f.calories, 0);
          return (
            <div key={d.id} className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
              <span className="text-base">{MEAL_ICONS[d.mealType]}</span>
              <div>
                <p className="text-xs font-semibold text-green-700">
                  {d.foods.map(f => f.name).join(', ')}
                </p>
                <p className="text-[11px] text-gray-400">{cal} kcal</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Goals ─────────────────────────────────────────────────────────────────

function GoalsSection() {
  const { goals, saveGoals } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState<UserGoals>(goals);

  function startEdit() { setDraft(goals); setEditing(true); }
  function cancel()    { setEditing(false); }
  function save()      { saveGoals(draft); setEditing(false); }

  function set(key: keyof UserGoals, val: string) {
    const n = val === '' ? null : parseFloat(val);
    setDraft((prev) => ({ ...prev, [key]: isNaN(n as number) ? null : n }));
  }

  const bmi =
    goals.weight && goals.height
      ? (goals.weight / Math.pow(goals.height / 100, 2)).toFixed(1)
      : null;

  const bmiLabel = bmi === null ? null
    : parseFloat(bmi) < 18.5 ? { label: '저체중', color: 'text-blue-500' }
    : parseFloat(bmi) < 23   ? { label: '정상',   color: 'text-green-500' }
    : parseFloat(bmi) < 25   ? { label: '과체중', color: 'text-yellow-500' }
    :                           { label: '비만',   color: 'text-red-500' };

  const fields: { key: keyof UserGoals; label: string; unit: string }[] = [
    { key: 'height',    label: '키',       unit: 'cm' },
    { key: 'weight',    label: '몸무게',   unit: 'kg' },
    { key: 'bodyFat',   label: '체지방률', unit: '%'  },
    { key: 'muscleMass',label: '골격근량', unit: 'kg' },
  ];

  return (
    <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800 text-sm">목표 & 신체 정보</h2>
        {!editing ? (
          <button onClick={startEdit} className="text-xs text-indigo-500 hover:text-indigo-700">편집</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={cancel} className="text-xs text-gray-400">취소</button>
            <button onClick={save}   className="text-xs text-indigo-600 font-semibold">저장</button>
          </div>
        )}
      </div>

      {!editing ? (
        <>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {fields.map(({ key, label, unit }) => (
              <div key={key} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400">{label}</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {goals[key] !== null ? `${goals[key]} ${unit}` : '—'}
                </p>
              </div>
            ))}
          </div>

          {/* BMI */}
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">BMI</p>
            {bmi ? (
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 text-sm">{bmi}</p>
                <span className={`text-xs font-medium ${bmiLabel?.color}`}>{bmiLabel?.label}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-300">키·몸무게 입력 시 계산</p>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-2">
          {fields.map(({ key, label, unit }) => (
            <div key={key} className="flex items-center gap-3">
              <label className="text-xs text-gray-500 w-16 shrink-0">{label}</label>
              <div className="flex-1 flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <input
                  type="number"
                  value={draft[key] ?? ''}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder="—"
                  className="flex-1 px-3 py-2 text-sm focus:outline-none"
                />
                <span className="pr-3 text-xs text-gray-400">{unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="px-4 pt-10 pb-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FitLog</h1>
          <p className="text-xs text-gray-400 mt-0.5">오늘도 기록하세요 💪</p>
        </div>
        <Link href="/upload" className="bg-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
          + 운동 업로드
        </Link>
      </div>

      {/* Calendar */}
      <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <Calendar />
      </section>

      {/* Goals */}
      <GoalsSection />
    </main>
  );
}
