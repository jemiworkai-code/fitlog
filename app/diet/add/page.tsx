'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { MealType, MEAL_LABELS, MEAL_ICONS, FoodEntry } from '@/types/diet';
import { searchFood } from '@/lib/foodDatabase';
import { generateId } from '@/lib/utils';

export default function AddDietPage() {
  const router = useRouter();
  const { addDietRecord } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recordDate, setRecordDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState<FoodEntry[]>([]);
  const [selected, setSelected] = useState<FoodEntry[]>([]);
  const [photo, setPhoto]       = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [note, setNote]         = useState('');

  function handleSearch(q: string) {
    setQuery(q);
    setResults(q.length > 0 ? searchFood(q) : []);
  }

  function addFood(food: FoodEntry) {
    setSelected((prev) => [...prev, food]);
    setQuery('');
    setResults([]);
  }

  function removeFood(index: number) {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  }

  function handleSave() {
    if (selected.length === 0) {
      alert('음식을 1개 이상 추가해주세요.');
      return;
    }

    addDietRecord({
      id: generateId(),
      date: recordDate,
      mealType,
      foods: selected,
      photoUrl,
      note,
    });

    router.push('/diet');
  }

  const totalCal = selected.reduce((s, f) => s + f.calories, 0);

  return (
    <main className="px-4 pt-4 pb-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-500 text-sm mb-4 hover:text-gray-700"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      <h1 className="text-xl font-bold text-gray-900 mb-5">식단 추가</h1>

      <div className="space-y-5">
        {/* Record Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">날짜</label>
          <input
            type="date"
            value={recordDate}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setRecordDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">식사 타입</label>
          <div className="grid grid-cols-4 gap-2">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((m) => (
              <button
                key={m}
                onClick={() => setMealType(m)}
                className={`py-2 rounded-xl text-xs font-medium transition-colors flex flex-col items-center gap-0.5 ${
                  mealType === m
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <span className="text-base">{MEAL_ICONS[m]}</span>
                {MEAL_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">식사 사진</label>
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handlePhoto} className="hidden" />
          {photoUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="식사 사진" className="w-full h-48 object-cover rounded-2xl" />
              <button
                onClick={() => { setPhoto(null); setPhotoUrl(null); }}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-7 h-7 text-xs flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-indigo-300 transition-colors"
            >
              <span className="text-3xl">📸</span>
              <span className="text-sm text-gray-400">식사 사진 촬영 또는 선택</span>
              <span className="text-xs text-gray-300">칼로리 자동 계산 (추후 AI 연동)</span>
            </button>
          )}
        </div>

        {/* Food Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">음식 검색</label>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="음식 이름을 검색하세요 (예: 닭가슴살)"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {results.length > 0 && (
            <div className="mt-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              {results.slice(0, 6).map((food, i) => (
                <button
                  key={i}
                  onClick={() => addFood(food)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-50 text-left border-b border-gray-50 last:border-0 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{food.name}</p>
                    <p className="text-xs text-gray-400">{food.amount}</p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">{food.calories} kcal</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected foods */}
        {selected.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">추가된 음식</label>
              <span className="text-sm font-semibold text-indigo-600">합계 {totalCal} kcal</span>
            </div>
            <div className="space-y-2">
              {selected.map((food, i) => (
                <div key={i} className="flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{food.name}</p>
                    <p className="text-xs text-gray-400">
                      {food.amount} · 단백질 {food.protein}g · 탄수화물 {food.carbs}g · 지방 {food.fat}g
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-indigo-600 font-semibold">{food.calories}</span>
                    <button onClick={() => removeFood(i)} className="text-gray-300 hover:text-red-400 text-sm">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">메모</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="오늘 식사에 대한 메모를 남겨보세요"
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={selected.length === 0}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          저장하기
        </button>
      </div>
    </main>
  );
}
