'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import WorkoutCard from '@/components/WorkoutCard';

export default function RecordsPage() {
  const { records } = useStore();

  return (
    <main className="px-4 pt-10 pb-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">운동 기록</h1>
        <Link
          href="/upload"
          className="bg-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          + 업로드
        </Link>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 text-4xl mb-3">🎥</p>
          <p className="text-sm text-gray-400">아직 기록이 없어요.</p>
          <Link href="/upload" className="mt-4 inline-block text-sm text-indigo-500 underline">
            첫 운동 영상 올리기
          </Link>
        </div>
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
