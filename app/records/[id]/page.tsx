'use client';

import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { EXERCISE_LABELS } from '@/types/workout';
import { formatDate } from '@/lib/utils';
import VideoPlayer from '@/components/VideoPlayer';
import AnalysisResult from '@/components/AnalysisResult';

export default function RecordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getRecord } = useStore();
  const router = useRouter();
  const record = getRecord(id);

  if (!record) {
    return (
      <main className="px-4 pt-12">
        <p className="text-gray-400 text-center mt-20">기록을 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="px-4 pt-4 pb-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-500 text-sm mb-4 hover:text-gray-700"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      {/* Title */}
      <div className="mb-4">
        <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
          {EXERCISE_LABELS[record.exerciseType]}
        </span>
        <p className="text-xs text-gray-400 mt-2">{formatDate(record.uploadedAt)}</p>
      </div>

      {/* Video */}
      <div className="mb-4">
        <VideoPlayer videoUrl={record.videoUrl} fileName={record.videoFileName} />
      </div>

      {/* Memo */}
      <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
        <p className="text-xs text-gray-400 mb-1">메모</p>
        <p className="text-sm text-gray-700 leading-relaxed">{record.memo || '메모 없음'}</p>
      </div>

      {/* Analysis Result */}
      <AnalysisResult result={record.analysisResult} />
    </main>
  );
}
