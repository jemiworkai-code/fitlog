'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import WorkoutCard from '@/components/WorkoutCard';

export default function HomePage() {
  const { records } = useStore();
  const recent = records.slice(0, 3);

  return (
    <main className="px-4 pt-12 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">FitLog</h1>
        <p className="text-sm text-gray-500 mt-1">내 운동 자세를 기록하고 분석하세요</p>
      </div>

      {/* CTA */}
      <Link href="/upload">
        <div className="bg-indigo-600 text-white rounded-2xl p-5 mb-8 flex items-center justify-between shadow-lg hover:bg-indigo-700 transition-colors">
          <div>
            <p className="font-semibold text-lg">운동 기록 시작하기</p>
            <p className="text-indigo-200 text-sm mt-0.5">영상을 업로드하고 자세를 분석해보세요</p>
          </div>
          <span className="text-3xl">🎥</span>
        </div>
      </Link>

      {/* Recent Records */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">최근 기록</h2>
          <Link href="/records" className="text-sm text-indigo-500">전체 보기</Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">아직 기록이 없어요.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((record) => (
              <WorkoutCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
