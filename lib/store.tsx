'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WorkoutRecord } from '@/types/workout';
import { DietRecord } from '@/types/diet';
import { MOCK_RECORDS, MOCK_DIET_RECORDS, MOCK_STEP_HISTORY } from './mockData';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface UserGoals {
  height: number | null;     // cm
  weight: number | null;     // kg
  bodyFat: number | null;    // %
  muscleMass: number | null; // kg
}

// ─── Serialization helpers ─────────────────────────────────────────────────

type StorableWorkout = Omit<WorkoutRecord, 'videoUrl'>;
type StorableDiet   = Omit<DietRecord, 'photoUrl'>;

function loadWorkouts(): WorkoutRecord[] {
  try {
    const raw = localStorage.getItem('fitlog_workouts');
    if (!raw) return MOCK_RECORDS;
    const stored: StorableWorkout[] = JSON.parse(raw);
    return stored.map((r) => ({ ...r, videoUrl: null }));
  } catch { return MOCK_RECORDS; }
}

function saveWorkouts(records: WorkoutRecord[]) {
  try {
    const storable: StorableWorkout[] = records.map(({ videoUrl: _, ...rest }) => rest);
    localStorage.setItem('fitlog_workouts', JSON.stringify(storable));
  } catch {}
}

function loadDiets(): DietRecord[] {
  try {
    const raw = localStorage.getItem('fitlog_diets');
    if (!raw) return MOCK_DIET_RECORDS;
    const stored: StorableDiet[] = JSON.parse(raw);
    return stored.map((r) => ({ ...r, photoUrl: null }));
  } catch { return MOCK_DIET_RECORDS; }
}

function saveDiets(records: DietRecord[]) {
  try {
    const storable: StorableDiet[] = records.map(({ photoUrl: _, ...rest }) => rest);
    localStorage.setItem('fitlog_diets', JSON.stringify(storable));
  } catch {}
}

function loadGoals(): UserGoals {
  try {
    const raw = localStorage.getItem('fitlog_goals');
    if (!raw) return { height: null, weight: null, bodyFat: null, muscleMass: null };
    return JSON.parse(raw);
  } catch { return { height: null, weight: null, bodyFat: null, muscleMass: null }; }
}

function saveGoalsToStorage(goals: UserGoals) {
  try { localStorage.setItem('fitlog_goals', JSON.stringify(goals)); } catch {}
}

function loadStepHistory(): Record<string, number> {
  try {
    const raw = localStorage.getItem('fitlog_steps');
    if (!raw) return MOCK_STEP_HISTORY;
    return JSON.parse(raw);
  } catch { return MOCK_STEP_HISTORY; }
}

function saveStepHistoryToStorage(history: Record<string, number>) {
  try { localStorage.setItem('fitlog_steps', JSON.stringify(history)); } catch {}
}

// ─── Context ────────────────────────────────────────────────────────────────

interface StoreContextType {
  records: WorkoutRecord[];
  addRecord: (record: WorkoutRecord) => void;
  getRecord: (id: string) => WorkoutRecord | undefined;
  getWorkoutsByDate: (date: string) => WorkoutRecord[];

  dietRecords: DietRecord[];
  addDietRecord: (record: DietRecord) => void;
  getDietsByDate: (date: string) => DietRecord[];

  goals: UserGoals;
  saveGoals: (g: UserGoals) => void;

  stepHistory: Record<string, number>;
  saveTodaySteps: (steps: number) => void;
  getLast7Steps: () => { date: string; label: string; steps: number }[];
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [records,     setRecords]     = useState<WorkoutRecord[]>([]);
  const [dietRecords, setDietRecords] = useState<DietRecord[]>([]);
  const [goals,       setGoalsState]  = useState<UserGoals>({ height: null, weight: null, bodyFat: null, muscleMass: null });
  const [stepHistory, setStepHistory] = useState<Record<string, number>>({});
  const [ready,       setReady]       = useState(false);

  useEffect(() => {
    setRecords(loadWorkouts());
    setDietRecords(loadDiets());
    setGoalsState(loadGoals());
    setStepHistory(loadStepHistory());
    setReady(true);
  }, []);

  function addRecord(record: WorkoutRecord) {
    setRecords((prev) => { const next = [record, ...prev]; saveWorkouts(next); return next; });
  }

  function getRecord(id: string) { return records.find((r) => r.id === id); }

  function getWorkoutsByDate(date: string) {
    return records.filter((r) => r.uploadedAt.slice(0, 10) === date);
  }

  function addDietRecord(record: DietRecord) {
    setDietRecords((prev) => { const next = [record, ...prev]; saveDiets(next); return next; });
  }

  function getDietsByDate(date: string) { return dietRecords.filter((r) => r.date === date); }

  function saveGoals(g: UserGoals) {
    setGoalsState(g);
    saveGoalsToStorage(g);
  }

  function saveTodaySteps(steps: number) {
    const today = new Date().toISOString().slice(0, 10);
    setStepHistory((prev) => {
      const next = { ...prev, [today]: steps };
      saveStepHistoryToStorage(next);
      return next;
    });
  }

  function getLast7Steps(): { date: string; label: string; steps: number }[] {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
      result.push({
        date: dateStr,
        label: i === 0 ? '오늘' : dayLabels[d.getDay()],
        steps: stepHistory[dateStr] ?? 0,
      });
    }
    return result;
  }

  if (!ready) return null;

  return (
    <StoreContext.Provider value={{
      records, addRecord, getRecord, getWorkoutsByDate,
      dietRecords, addDietRecord, getDietsByDate,
      goals, saveGoals,
      stepHistory, saveTodaySteps, getLast7Steps,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
