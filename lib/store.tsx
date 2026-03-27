'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WorkoutRecord } from '@/types/workout';
import { MOCK_RECORDS } from './mockData';

interface StoreContextType {
  records: WorkoutRecord[];
  addRecord: (record: WorkoutRecord) => void;
  getRecord: (id: string) => WorkoutRecord | undefined;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WorkoutRecord[]>(MOCK_RECORDS);

  function addRecord(record: WorkoutRecord) {
    setRecords((prev) => [record, ...prev]);
  }

  function getRecord(id: string) {
    return records.find((r) => r.id === id);
  }

  return (
    <StoreContext.Provider value={{ records, addRecord, getRecord }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
