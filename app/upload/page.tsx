'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ExerciseType, EXERCISE_LABELS, DUMMY_ANALYSIS } from '@/types/workout';
import { generateId } from '@/lib/utils';

export default function UploadPage() {
  const router = useRouter();
  const { addRecord } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [exerciseType, setExerciseType] = useState<ExerciseType>('squat');
  const [memo, setMemo] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  }

  async function handleSave() {
    if (!videoFile) {
      alert('영상 파일을 선택해주세요.');
      return;
    }

    setSaving(true);

    // Create object URL for in-memory video access
    const videoUrl = URL.createObjectURL(videoFile);

    addRecord({
      id: generateId(),
      exerciseType,
      memo,
      uploadedAt: new Date().toISOString(),
      videoUrl,
      videoFileName: videoFile.name,
      analysisResult: DUMMY_ANALYSIS[exerciseType],
    });

    setSaving(false);
    router.push('/records');
  }

  return (
    <main className="px-4 pt-12 pb-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">운동 영상 업로드</h1>

      <div className="space-y-5">
        {/* Exercise Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">운동 종류</label>
          <select
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {(Object.entries(EXERCISE_LABELS) as [ExerciseType, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Memo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="오늘 배운 자세나 주의할 점을 적어보세요"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">영상 파일</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl py-8 flex flex-col items-center gap-2 transition-colors ${
              videoFile
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <span className="text-2xl">{videoFile ? '✅' : '📁'}</span>
            <span className="text-sm text-gray-500">
              {videoFile ? videoFile.name : '파일을 선택하세요'}
            </span>
            {!videoFile && <span className="text-xs text-gray-400">MP4, MOV 등 영상 파일</span>}
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving || !videoFile}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </main>
  );
}
