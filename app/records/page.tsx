'use client';

import { useStore } from '@/lib/store';
import WorkoutCard from '@/components/WorkoutCard';

export default function RecordsPage() {
  const { records } = useStore();

  return (
    <main className="px-4 pt-12 pb-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">운동 기록</h1>

      {records.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-20">기록이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <WorkoutCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </main>
  );
}
