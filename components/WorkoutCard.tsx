'use client';

import Link from 'next/link';
import { WorkoutRecord, EXERCISE_LABELS } from '@/types/workout';
import { formatDate } from '@/lib/utils';

interface WorkoutCardProps {
  record: WorkoutRecord;
}

export default function WorkoutCard({ record }: WorkoutCardProps) {
  return (
    <Link href={`/records/${record.id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {EXERCISE_LABELS[record.exerciseType]}
          </span>
          <span className="text-xs text-gray-400">{formatDate(record.uploadedAt)}</span>
        </div>
        {record.videoFileName && (
          <p className="text-xs text-gray-400 mb-1 truncate">📎 {record.videoFileName}</p>
        )}
        <p className="text-sm text-gray-600 line-clamp-2">{record.memo || '메모 없음'}</p>
      </div>
    </Link>
  );
}
