'use client';

interface VideoPlayerProps {
  videoUrl: string | null;
  fileName?: string;
}

/**
 * 영상 플레이어 컴포넌트
 * videoUrl이 null이면 더미 플레이스홀더를 표시합니다.
 */
export default function VideoPlayer({ videoUrl, fileName }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 10l4.553-2.277A1 1 0 0121 8.623v6.754a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
        <p className="text-sm">{fileName ?? '영상 없음'}</p>
        <p className="text-xs">샘플 데이터 — 영상 없음</p>
      </div>
    );
  }

  return (
    <video
      src={videoUrl}
      controls
      className="w-full aspect-video rounded-2xl bg-black object-contain"
    />
  );
}
