'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WorkoutRecord } from '@/types/workout';
import { DietRecord } from '@/types/diet';
import { MOCK_RECORDS } from './mockData';

// ─── Serialization helpers ─────────────────────────────────────────────────
// Blob URLs (videoUrl / photoUrl) are session-only and cannot survive JSON round-trips.
// We persist metadata only; URLs are restored to null on reload and shown as placeholders.

type StorableWorkout = Omit<WorkoutRecord, 'videoUrl'>;
type StorableDiet   = Omit<DietRecord, 'photoUrl'>;

function loadWorkouts(): WorkoutRecord[] {
  try {
    const raw = localStorage.getItem('fitlog_workouts');
    if (!raw) return MOCK_RECORDS;
    const stored: StorableWorkout[] = JSON.parse(raw);
    return stored.map((r) => ({ ...r, videoUrl: null }));
  } catch {
    return MOCK_RECORDS;
  }
}

function saveWorkouts(records: WorkoutRecord[]) {
  try {
    const storable: StorableWorkout[] = records.map(({ videoUrl: _, ...rest }) => rest);
    localStorage.setItem('fitlog_workouts', JSON.stringify(storable));
  } catch {
    // storage full or SSR — ignore
  }
}

function loadDiets(): DietRecord[] {
  try {
    const raw = localStorage.getItem('fitlog_diets');
    if (!raw) return [];
    const stored: StorableDiet[] = JSON.parse(raw);
    return stored.map((r) => ({ ...r, photoUrl: null }));
  } catch {
    return [];
  }
}

function saveDiets(records: DietRecord[]) {
  try {
    const storable: StorableDiet[] = records.map(({ photoUrl: _, ...rest }) => rest);
    localStorage.setItem('fitlog_diets', JSON.stringify(storable));
  } catch {}
}

// ─── Context ────────────────────────────────────────────────────────────────

interface StoreContextType {
  // workouts
  records: WorkoutRecord[];
  addRecord: (record: WorkoutRecord) => void;
  getRecord: (id: string) => WorkoutRecord | undefined;
  // diet
  dietRecords: DietRecord[];
  addDietRecord: (record: DietRecord) => void;
  getDietsByDate: (date: string) => DietRecord[];
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [records, setRecords]         = useState<WorkoutRecord[]>([]);
  const [dietRecords, setDietRecords] = useState<DietRecord[]>([]);
  const [ready, setReady]             = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setRecords(loadWorkouts());
    setDietRecords(loadDiets());
    setReady(true);
  }, []);

  function addRecord(record: WorkoutRecord) {
    setRecords((prev) => {
      const next = [record, ...prev];
      saveWorkouts(next);
      return next;
    });
  }

  function getRecord(id: string) {
    return records.find((r) => r.id === id);
  }

  function addDietRecord(record: DietRecord) {
    setDietRecords((prev) => {
      const next = [record, ...prev];
      saveDiets(next);
      return next;
    });
  }

  function getDietsByDate(date: string) {
    return dietRecords.filter((r) => r.date === date);
  }

  if (!ready) return null; // wait for hydration to avoid flicker

  return (
    <StoreContext.Provider value={{ records, addRecord, getRecord, dietRecords, addDietRecord, getDietsByDate }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
