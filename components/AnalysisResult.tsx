import { AnalysisResult as AnalysisResultType } from '@/types/workout';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

/**
 * 분석 결과 컴포넌트
 * 추후 실제 AI 분석 결과를 이 컴포넌트에 연결하면 됩니다.
 * result prop의 데이터 출처만 변경하면 됩니다.
 */
export default function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <div className="bg-indigo-50 rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-indigo-600 font-semibold text-sm">AI 자세 분석 결과</span>
        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">데모</span>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1.5">주요 사용 근육군</p>
        <div className="flex flex-wrap gap-1.5">
          {result.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="bg-white text-indigo-600 text-xs border border-indigo-200 px-2.5 py-1 rounded-full"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1">코멘트</p>
        <p className="text-sm text-gray-700 leading-relaxed">{result.comment}</p>
      </div>
    </div>
  );
}
